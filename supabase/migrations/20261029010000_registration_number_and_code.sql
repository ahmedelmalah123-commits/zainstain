-- ==============================================================================
-- Migration: 20261029010000_registration_number_and_code.sql
-- Description: 
--   1. Adds registration_number (bigint) & registration_code (text) columns.
--   2. Backfills existing registrations preserved safely (numbered 96..100).
--   3. Starts new registration sequence at 101 (atomic, race-condition safe).
--   4. Adds BEFORE INSERT trigger for automatic defaults.
--   5. Creates register_student RPC function with atomic generation & return.
--   6. Creates verify_registration_code RPC function for public verification.
--   7. Updates get_admin_registrations RPC to return registration_number & code.
-- ==============================================================================

-- 1. Add columns to public.course_registrations
alter table public.course_registrations
  add column if not exists registration_number bigint,
  add column if not exists registration_code text;

-- 2. Backfill existing registrations without disturbing existing data
-- Current existing rows get numbered up to 100 in order of creation
do $$
declare
  v_count integer;
begin
  select count(*) into v_count
  from public.course_registrations
  where registration_number is null;

  if v_count > 0 then
    with ranked as (
      select id,
             name,
             phone,
             (100 - v_count + row_number() over (order by created_at asc)) as reg_num
      from public.course_registrations
      where registration_number is null
    )
    update public.course_registrations c
    set registration_number = r.reg_num,
        registration_code = 'ZS' || r.reg_num::text || coalesce(
          substring(upper(trim(r.name)) from '[A-Z]'),
          chr(65 + (abs(hashtext(coalesce(r.name, '') || coalesce(r.phone, ''))) % 26))
        )
    from ranked r
    where c.id = r.id;
  end if;
end $$;

-- 3. Create sequence starting at 101 for all new registrations
create sequence if not exists public.course_registration_number_seq
  start with 101
  increment by 1
  minvalue 1
  no maxvalue
  cache 1;

-- If sequence already existed, ensure its next value is at least 101
select setval(
  'public.course_registration_number_seq',
  greatest(100, coalesce((select max(registration_number) from public.course_registrations), 100))
);

-- 4. Unique constraints & indexes
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'course_registrations_registration_number_unique'
  ) then
    alter table public.course_registrations
      add constraint course_registrations_registration_number_unique unique (registration_number);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'course_registrations_registration_code_unique'
  ) then
    alter table public.course_registrations
      add constraint course_registrations_registration_code_unique unique (registration_code);
  end if;
end $$;

create index if not exists idx_course_registrations_reg_code
  on public.course_registrations (upper(trim(registration_code)));

-- 5. Trigger to automatically generate registration_number & code on any insert
create or replace function public.trg_course_registration_defaults()
returns trigger
language plpgsql
as $$
declare
  v_letter text;
begin
  -- Assign atomic registration number if not provided
  if new.registration_number is null then
    new.registration_number := nextval('public.course_registration_number_seq');
  end if;

  -- Assign registration code if not provided
  if new.registration_code is null or new.registration_code = '' then
    -- Pick first English letter from name, or deterministic A-Z based on hash
    v_letter := substring(upper(trim(new.name)) from '[A-Z]');
    if v_letter is null or v_letter = '' then
      v_letter := chr(65 + (abs(hashtext(coalesce(new.name, '') || coalesce(new.phone, ''))) % 26));
    end if;

    new.registration_code := 'ZS' || new.registration_number::text || v_letter;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_course_registration_before_insert on public.course_registrations;
create trigger trg_course_registration_before_insert
  before insert on public.course_registrations
  for each row
  execute function public.trg_course_registration_defaults();

-- 6. RPC: register_student (Atomic, Concurrency-Safe, returns confirmation details to user)
create or replace function public.register_student(
  p_name text,
  p_email text,
  p_phone text,
  p_age smallint,
  p_governorate text,
  p_study_info text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reg_num bigint;
  v_letter text;
  v_reg_code text;
  v_new_row public.course_registrations%rowtype;
begin
  -- Strict validation
  if p_name is null or char_length(trim(p_name)) < 2 then
    raise exception 'الاسم الكامل مطلوب (حرفين على الأقل)';
  end if;
  if p_email is null or char_length(trim(p_email)) < 5 or p_email not like '%@%.%' then
    raise exception 'البريد الإلكتروني غير صحيح';
  end if;
  if p_phone is null or char_length(trim(p_phone)) < 7 then
    raise exception 'رقم الهاتف / واتساب غير صحيح';
  end if;
  if p_age is null or p_age < 10 or p_age > 100 then
    raise exception 'السن يجب أن يكون بين 10 و100';
  end if;
  if p_governorate is null or char_length(trim(p_governorate)) < 2 then
    raise exception 'المحافظة مطلوبة';
  end if;
  if p_study_info is null or char_length(trim(p_study_info)) < 2 then
    raise exception 'المجال الدراسي مطلوب';
  end if;

  -- Atomic number from sequence
  v_reg_num := nextval('public.course_registration_number_seq');

  -- Code format: ZS + registration_number + Latin uppercase letter
  v_letter := substring(upper(trim(p_name)) from '[A-Z]');
  if v_letter is null or v_letter = '' then
    v_letter := chr(65 + (abs(hashtext(trim(p_name) || trim(p_phone))) % 26));
  end if;
  v_reg_code := 'ZS' || v_reg_num::text || v_letter;

  -- Insert record
  insert into public.course_registrations (
    name,
    email,
    phone,
    age,
    governorate,
    study_info,
    status,
    registration_number,
    registration_code
  ) values (
    trim(p_name),
    lower(trim(p_email)),
    trim(p_phone),
    p_age,
    trim(p_governorate),
    trim(p_study_info),
    'new',
    v_reg_num,
    v_reg_code
  )
  returning * into v_new_row;

  return jsonb_build_object(
    'success', true,
    'id', v_new_row.id,
    'name', v_new_row.name,
    'email', v_new_row.email,
    'phone', v_new_row.phone,
    'registration_number', v_new_row.registration_number,
    'registration_code', v_new_row.registration_code,
    'created_at', v_new_row.created_at,
    'course_name', 'Foundation of Software Engineering and Artificial Intelligence',
    'voucher_discount', '100%',
    'early_access', true,
    'workshop_included', true
  );
end;
$$;

grant execute on function public.register_student(text, text, text, smallint, text, text)
  to anon, authenticated;

-- 7. RPC: verify_registration_code (Public verification for students)
create or replace function public.verify_registration_code(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.course_registrations%rowtype;
begin
  if p_code is null or trim(p_code) = '' then
    return jsonb_build_object('valid', false, 'message', 'من فضلك أدخل كود التسجيل');
  end if;

  select * into v_row
  from public.course_registrations
  where upper(trim(registration_code)) = upper(trim(p_code))
  limit 1;

  if not found then
    return jsonb_build_object(
      'valid', false,
      'message', 'كود التسجيل غير مسجل في النظام. تأكد من إدخال الكود الصحيح (مثال: ZS101A)'
    );
  end if;

  return jsonb_build_object(
    'valid', true,
    'registration_number', v_row.registration_number,
    'registration_code', v_row.registration_code,
    'student_first_name', split_part(trim(v_row.name), ' ', 1),
    'course_name', 'Foundation of Software Engineering and Artificial Intelligence',
    'voucher_discount', '100%',
    'early_access', true,
    'workshop_included', true,
    'created_at', v_row.created_at,
    'status', v_row.status
  );
end;
$$;

grant execute on function public.verify_registration_code(text)
  to anon, authenticated;

-- 8. Update get_admin_registrations to return all fields ordered by registration_number desc
create or replace function public.get_admin_registrations(pin_code text)
returns setof public.course_registrations
language plpgsql
security definer
set search_path = public
as $$
begin
  if pin_code = '2026' then
    return query
      select * from public.course_registrations
      order by registration_number desc nulls last, created_at desc;
  else
    raise exception 'رمز الدخول غير صحيح';
  end if;
end;
$$;

grant execute on function public.get_admin_registrations(text)
  to anon, authenticated;
