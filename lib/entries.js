import { createClient } from "../utils/supabase/server.js";

// Re-exported so server-side pages can import both the fetch and the
// catalogue helpers from one place. Client components must import
// lib/catalogue.js directly instead — this file's Supabase import isn't
// safe in a client bundle.
export { isGeneralHistory, withCatalogueInfo } from "./catalogue.js";

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
    contributor: row.contributor_name || row.contributor_email,
    contributorId: row.contributor_id,
    story: row.story || null,
    sources: row.sources || null,
    status: row.status,
  };
}

// Reads every PUBLISHED entry. If the read fails for any reason (network
// issue, missing env config), this returns an empty archive rather than
// throwing, so a database hiccup shows "0 objects" instead of a crashed page.
export async function getAllEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data.map(toEntry);
  } catch {
    return [];
  }
}

// One entry by id, in any status. Row-level security decides who gets it:
// everyone for published entries, only the owner and admins otherwise.
export async function getEntryById(id) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("entries").select("*").eq("id", id).maybeSingle();
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
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error || !data) return [];
    return data.map(toEntry);
  } catch {
    return [];
  }
}
