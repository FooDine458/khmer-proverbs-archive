import { createClient } from "../utils/supabase/server.js";
import seedEntries from "../data/entries.js";

// Merges the static seed entries with contributor-submitted rows from
// Supabase, normalized to the same shape so EntryCard/EntryDetail don't need
// to know the difference. If the Supabase read fails for any reason, this
// falls back to seed-only rather than throwing, so browsing the archive
// never depends on the database being reachable.
export async function getAllEntries() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return seedEntries;

    const contributed = data.map((row) => ({
      id: row.id,
      khmerName: row.khmer_name,
      romanization: row.romanization,
      englishName: row.english_name,
      description: row.description,
      image: row.image_url || "",
      imageAlt: row.english_name,
      place: row.place,
      contributor: row.contributor_email,
      contributorId: row.contributor_id,
    }));

    return [...contributed, ...seedEntries];
  } catch {
    return seedEntries;
  }
}
