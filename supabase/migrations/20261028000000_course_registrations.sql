create table if not exists public.course_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 5 and 254),
  phone text not null check (char_length(trim(phone)) between 7 and 32),
  age smallint not null check (age between 10 and 100),
  governorate text not null check (char_length(trim(governorate)) between 2 and 100),
  study_info text not null check (char_length(trim(study_info)) between 2 and 200),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'enrolled')),
  created_at timestamptz not null default now()
);

alter table public.course_registrations enable row level security;

revoke all on table public.course_registrations from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert (name, email, phone, age, governorate, study_info)
  on table public.course_registrations to anon, authenticated;

drop policy if exists "Public can submit course registrations"
  on public.course_registrations;

create policy "Public can submit course registrations"
  on public.course_registrations
  for insert
  to anon, authenticated
  with check (status = 'new');
