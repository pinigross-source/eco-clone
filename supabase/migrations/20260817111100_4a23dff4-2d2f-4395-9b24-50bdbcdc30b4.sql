create or replace function public.grant_owner_admin_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if lower(NEW.email) in ('pinigross@gmail.com') then
    insert into public.user_roles (user_id, role)
    values (NEW.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return NEW;
end;
$$;

drop trigger if exists on_auth_user_created_grant_admin on auth.users;
create trigger on_auth_user_created_grant_admin
after insert on auth.users
for each row execute function public.grant_owner_admin_role();