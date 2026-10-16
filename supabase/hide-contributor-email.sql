-- Hide contributor_email from the public API.
--
-- Problem: the browser key can read every column of `entries`, so anyone could
-- run  GET /rest/v1/entries?select=contributor_email  and collect all the
-- contributors' emails. The site never shows them.
--
-- ORDER MATTERS. Deploy the code that lists columns by name FIRST (lib/entries.js),
-- then run this in the Supabase SQL editor. Run it before the deploy and every
-- select("*") on the live site fails.
--
-- A column-level REVOKE does nothing while a table-wide SELECT grant exists,
-- so take the table-wide grant away and grant back every column except the email.
-- Row-level security policies are untouched.

-- BEFORE RUNNING, check two things in the SQL editor:
--   1. No policy or function reads contributor_email as the calling user:
--        select polname, pg_get_expr(polqual, polrelid), pg_get_expr(polwithcheck, polrelid)
--        from pg_policy where polrelid = 'public.entries'::regclass;
--   2. The column list below covers every column the site reads:
--        select column_name from information_schema.columns
--        where table_schema = 'public' and table_name = 'entries';

revoke select on public.entries from anon, authenticated;

grant select (
  id, khmer_name, romanization, english_name, description, image_url, image_alt,
  place, contributor_name, contributor_id, story, sources, status, created_at
) on public.entries to anon, authenticated;

-- INSERT, UPDATE and DELETE grants are not changed. Inserting contributor_email
-- still works; reading it back through the API no longer does.
-- If you add a column later, grant select on it too, or the site will not see it.

-- Check (run as anon in the API, should now fail with "permission denied"):
--   GET /rest/v1/entries?select=contributor_email
-- Roll back:
--   grant select on public.entries to anon, authenticated;
