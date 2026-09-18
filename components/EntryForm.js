"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function EntryForm() {
  const [form, setForm] = useState({
    khmerName: "",
    romanization: "",
    englishName: "",
    description: "",
    place: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function onChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("entries")
      .insert({
        contributor_id: user.id,
        contributor_email: user.email,
        khmer_name: form.khmerName,
        romanization: form.romanization || null,
        english_name: form.englishName,
        description: form.description,
        place: form.place || null,
        image_url: form.imageUrl || null,
      })
      .select("id")
      .single();

    if (error) {
      setError("Couldn't save this entry. Check the required fields and try again.");
      setSaving(false);
      return;
    }

    window.location.href = `/entries/${data.id}`;
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="auth-card">
          <span className="eyebrow">Add to the archive</span>
          <h1 className="auth-title">New entry</h1>
          <p className="auth-lead">Share a household item and its story.</p>
          <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-khmer">
                Khmer name
              </label>
              <input
                id="entry-khmer"
                className="auth-input"
                lang="km"
                value={form.khmerName}
                onChange={onChange("khmerName")}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-romanization">
                Romanization
              </label>
              <input
                id="entry-romanization"
                className="auth-input"
                value={form.romanization}
                onChange={onChange("romanization")}
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-english">
                English name
              </label>
              <input
                id="entry-english"
                className="auth-input"
                value={form.englishName}
                onChange={onChange("englishName")}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-description">
                Description
              </label>
              <textarea
                id="entry-description"
                className="auth-input"
                value={form.description}
                onChange={onChange("description")}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-place">
                Place
              </label>
              <input
                id="entry-place"
                className="auth-input"
                value={form.place}
                onChange={onChange("place")}
                placeholder="Optional"
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="entry-image">
                Image URL
              </label>
              <input
                id="entry-image"
                className="auth-input"
                type="url"
                value={form.imageUrl}
                onChange={onChange("imageUrl")}
                placeholder="Optional"
              />
            </div>
            {error ? (
              <p className="auth-error" role="alert">
                {error}
              </p>
            ) : null}
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Add entry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
