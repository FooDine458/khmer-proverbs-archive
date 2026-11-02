-- Remember when each entry last changed, so an admin can't approve a version
-- they never saw.
--
-- Problem: the admin page loads a pending entry, the contributor edits it
-- (it stays pending), and the admin's Approve then publishes the new text
-- unread. ReviewCard now only saves when updated_at still matches the version
-- the admin loaded; this file adds that column.
--
-- ORDER MATTERS. Run this in the Supabase SQL editor FIRST, then deploy the
-- code that reads updated_at (lib/entries.js). Deploy first and every read of
-- entries fails, because the column doesn't exist yet.

alter table public.entries
  add column updated_at timestamptz not null default now();

-- Stamped by the database on every update, so neither the browser nor a
-- contributor can set it to an old value.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger entries_set_updated_at
  before update on public.entries
  for each row execute function public.set_updated_at();

-- Reads are granted column by column (see hide-contributor-email.sql), so the
-- new column needs its own grant or the site can't read or filter on it.
grant select (updated_at) on public.entries to anon, authenticated;

-- Check: update any entry, then its updated_at should be a moment ago:
--   select id, status, updated_at from public.entries order by updated_at desc limit 3;
-- Roll back (deploy the old code first):
--   drop trigger entries_set_updated_at on public.entries;
--   drop function public.set_updated_at();
--   alter table public.entries drop column updated_at;
