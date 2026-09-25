import { createClient } from "../utils/supabase/server.js";

// Reads every entry from Supabase, normalized to the shape EntryCard and
// EntryDetail expect. If the read fails for any reason (network issue,
// missing env config), this returns an empty archive rather than throwing,
// so a database hiccup shows "0 objects" instead of a crashed page.
export async function getAllEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
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
    }));
  } catch {
    return [];
  }
}
