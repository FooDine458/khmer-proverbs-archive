-- New alt text for the three photos that were replaced.
-- The old text described the old pictures, so screen readers would read the
-- wrong thing. Run this in the Supabase SQL editor after the deploy.
-- Changes only image_alt, only for these three entries.

update public.entries
set image_alt = 'A plain aluminium tin filled to the brim with raw rice, held in two cupped hands.'
where image_url = '/images/krolar-rice-can.jpeg';

update public.entries
set image_alt = 'A grey granite mortar with its pestle leaning inside, on a stone ledge in front of green leaves.'
where image_url = '/images/tbal-stone-mortar.jpeg';

update public.entries
set image_alt = 'A white electric rice cooker with a stainless steel lid and black handles, its power cord curled in front.'
where image_url = '/images/chhnang-bay-rice-cooker.jpeg';
