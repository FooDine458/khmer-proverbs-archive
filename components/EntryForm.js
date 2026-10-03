"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { PROVINCES, cleanEntry, validateEntry, validatePhotoFile } from "../lib/entryRules.js";
import { saveEntry } from "../lib/saveEntry.js";
import FormField from "./FormField.js";

// Add form, or edit form when `entry` is passed (pre-filled; photo optional).
export default function EntryForm({ entry }) {
  const [form, setForm] = useState({
    khmerName: entry?.khmerName || "",
    romanization: entry?.romanization || "",
    englishName: entry?.englishName || "",
    place: entry?.place || "",
    source: entry?.contributor || "",
    link: entry?.sources?.[0]?.url || "",
    description: entry?.description || "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const bind = (name) => ({
    id: `entry-${name}`,
    value: form[name],
    error: errors[name],
    onChange: (e) => setForm((f) => ({ ...f, [name]: e.target.value })),
  });

  async function onSubmit(event) {
    event.preventDefault();
    setMessage("");
    const values = cleanEntry(form);
    const found = validateEntry(values);
    const photoError = file || !entry ? validatePhotoFile(file) : "";
    if (photoError) found.photo = photoError;
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = "/login";
        return;
      }
      const id = await saveEntry(supabase, { user: data.user, values, file, entry });
      window.location.href = `/entries/${id}`;
    } catch (err) {
      console.error("Saving entry failed:", err);
      setMessage(entry ? "That change wasn't saved. Please try again." : "Couldn't save this entry. Check your connection and try again.");
      setSaving(false);
    }
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="auth-card">
          <span className="eyebrow">{entry ? "Edit entry" : "Add to the archive"}</span>
          <h1 className="auth-title">{entry ? "Edit entry" : "New entry"}</h1>
          <form className="auth-form" onSubmit={onSubmit} noValidate>
            <FormField {...bind("khmerName")} label="Khmer name" lang="km" />
            <FormField {...bind("romanization")} label="Romanization (optional)" />
            <FormField {...bind("englishName")} label="English name" />
            <FormField {...bind("place")} label="Province" as="select" options={PROVINCES} />
            <FormField {...bind("source")} label="Source (who in your family told you)" />
            <FormField {...bind("link")} label="Link (optional)" type="url" />
            <FormField {...bind("description")} label="Description" as="textarea" />
            <FormField
              id="entry-photo"
              label={entry ? "Replace photo (optional)" : "Photo"}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              error={errors.photo}
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
            {message ? <p className="auth-error" role="alert">{message}</p> : null}
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : entry ? "Save changes" : "Add entry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
