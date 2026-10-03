import { uploadPhoto } from "./entryPhoto.js";

// Inserts a new entry, or updates an existing one when `entry` is given.
// `values` must already be trimmed and validated. Columns are listed by name
// on purpose: never spread the form into the table. The owner comes from the
// logged-in user, never from a form field.
//
// Throws on failure (callers log it and show a safe message). For updates,
// RLS refuses a change by affecting zero rows without raising an error, so
// the returned row is checked explicitly.
export async function saveEntry(supabase, { user, values, file, entry }) {
  const imageUrl = file ? await uploadPhoto(supabase, user.id, file) : null;

  const fields = {
    khmer_name: values.khmerName,
    romanization: values.romanization || null,
    english_name: values.englishName,
    description: values.description,
    place: values.place,
    contributor_name: values.source,
    image_alt: values.englishName,
  };
  if (imageUrl) fields.image_url = imageUrl;

  // On edit, only touch `sources` if the link changed, so entries that carry
  // several references don't lose them when someone fixes a typo.
  const linkChanged = !entry || values.link !== (entry.sources?.[0]?.url || "");
  if (linkChanged) {
    fields.sources = values.link
      ? [{ label: new URL(values.link).hostname, url: values.link }]
      : null;
  }

  const query = entry
    ? supabase.from("entries").update(fields).eq("id", entry.id)
    : supabase.from("entries").insert({
        ...fields,
        contributor_id: user.id,
        contributor_email: user.email,
      });

  const { data, error } = await query.select("id");
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("No row came back: the change was not saved");
  return data[0].id;
}
