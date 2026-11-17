-- Let an admin delete any photo in the `photos` bucket.
-- Until now only a contributor could delete files in their own folder, so when
-- an admin deleted someone else's entry the photo file was left behind.
-- Run this in the Supabase SQL editor. Adds one DELETE policy; changes no data.

create policy "admins delete any photo"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'photos'
  and (select public.is_admin())
);
