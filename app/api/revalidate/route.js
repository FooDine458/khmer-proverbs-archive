import { revalidateTag } from "next/cache";
import { createClient } from "../../../utils/supabase/server.js";

// The public list of entries is cached for a minute (lib/entries.js). When a
// logged-in user saves, reviews or deletes an entry, the page calls this so
// the change shows up right away instead of after the cache expires.
// Only a logged-in user can call it; it changes nothing but the cache.
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ ok: false }, { status: 401 });

  revalidateTag("entries");
  return Response.json({ ok: true });
}
