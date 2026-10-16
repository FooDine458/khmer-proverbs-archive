import { unstable_cache } from "next/cache";
import { createClient } from "../utils/supabase/server.js";
import { createPublicClient } from "../utils/supabase/public.js";

// Re-exported so server-side pages can import both the fetch and the
// catalogue helpers from one place. Client components must import
// lib/catalogue.js directly instead — this file's Supabase import isn't
// safe in a client bundle.
export { isGeneralHistory, withCatalogueInfo } from "./catalogue.js";

// Every column the site reads, named on purpose instead of select("*").
// contributor_email is left out: it is private, and the database refuses to
// hand it to the browser key anyway (see supabase/hide-contributor-email.sql).
const ENTRY_COLUMNS =
  "id, khmer_name, romanization, english_name, description, image_url, image_alt, " +
  "place, contributor_name, contributor_id, story, sources, status, created_at";

// Normalizes a database row to the shape EntryCard and EntryDetail expect.
function toEntry(row) {
  return {
    id: row.id,
    khmerName: row.khmer_name,
    romanization: row.romanization,
    englishName: row.english_name,
    description: row.description,
    image: row.image_url || "",
    imageAlt: row.image_alt || row.english_name,
    place: row.place,
    contributor: row.contributor_name || "",
    contributorId: row.contributor_id,
    story: row.story || null,
    sources: row.sources || null,
    status: row.status,
  };
}

// The published list is the same for every visitor, so it is cached for a
// minute and shared. Saving, reviewing or deleting an entry clears it at once
// through /api/revalidate. It throws on failure so an error is never cached.
const readPublished = unstable_cache(
  async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("entries")
      .select(ENTRY_COLUMNS)
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  ["published-entries"],
  { revalidate: 60, tags: ["entries"] }
);

// Same list, but a failed read throws. The home page and the sitemap use this:
// when Next rebuilds a cached page and it throws, Next keeps serving the last
// good copy, instead of caching an empty archive for a minute.
export async function getPublishedEntries() {
  return (await readPublished()).map(toEntry);
}

// Reads every PUBLISHED entry. If the read fails for any reason (network
// issue, missing env config), this returns an empty archive rather than
// throwing, so a database hiccup shows "0 objects" instead of a crashed page.
// For pages that are not cached.
export async function getAllEntries() {
  try {
    return await getPublishedEntries();
  } catch {
    return [];
  }
}

// One entry by id, in any status. Row-level security decides who gets it:
// everyone for published entries, only the owner and admins otherwise.
export async function getEntryById(id) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("entries").select(ENTRY_COLUMNS).eq("id", id).maybeSingle();
    if (error || !data) return null;
    return toEntry(data);
  } catch {
    return null;
  }
}

// Entries waiting for review, oldest first. Only an admin gets rows back.
export async function getPendingEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entries")
      .select(ENTRY_COLUMNS)
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error || !data) return [];
    return data.map(toEntry);
  } catch {
    return [];
  }
}
