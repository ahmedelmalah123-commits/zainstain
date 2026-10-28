-- Admin RPC to read registrations securely using PIN '2026'
create or replace function public.get_admin_registrations(pin_code text)
returns setof public.course_registrations
language plpgsql
security definer
set search_path = public
as $$
begin
  if pin_code = '2026' then
    return query select * from public.course_registrations order by created_at desc;
  else
    raise exception 'رمز الدخول غير صحيح';
  end if;
end;
$$;

grant execute on function public.get_admin_registrations(text) to anon, authenticated;

-- Admin RPC to delete a registration
create or replace function public.delete_registration(pin_code text, reg_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if pin_code = '2026' then
    delete from public.course_registrations where id = reg_id;
  else
    raise exception 'غير مصرح';
  end if;
end;
$$;

grant execute on function public.delete_registration(text, uuid) to anon, authenticated;

-- Admin RPC to update status
create or replace function public.update_registration_status(pin_code text, reg_id uuid, new_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if pin_code = '2026' then
    update public.course_registrations set status = new_status where id = reg_id;
  else
    raise exception 'غير مصرح';
  end if;
end;
$$;

grant execute on function public.update_registration_status(text, uuid, text) to anon, authenticated;
