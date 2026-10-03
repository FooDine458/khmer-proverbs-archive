"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

// One pending entry with Approve / Reject. Only an admin's session can change
// `status` (row-level security), so we check that a row came back, same as
// the owner's edit and delete: a refused update quietly changes zero rows.
export default function ReviewCard({ entry }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function review(status) {
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("entries")
        .update({ status })
        .eq("id", entry.id)
        .select("id");
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No row came back: the review was not saved");
      window.location.reload();
    } catch (err) {
      console.error("Reviewing entry failed:", err);
      setError("That change wasn't saved.");
      setBusy(false);
    }
  }

  return (
    <article className="review-card">
      <h2 lang="km">{entry.khmerName}</h2>
      <p>
        <em>{entry.romanization}</em> {entry.englishName}, {entry.place}
      </p>
      <p>{entry.description}</p>
      <p className="metadata">Source: {entry.contributor}</p>
      {entry.image ? <img src={entry.image} alt={entry.imageAlt} width="240" /> : null}
      <p>
        <a href={`/entries/${entry.id}`}>Open full entry</a>
      </p>
      <div className="review-actions">
        <button type="button" className="btn-primary" disabled={busy} onClick={() => review("published")}>
          Approve
        </button>{" "}
        <button type="button" className="btn-delete" disabled={busy} onClick={() => review("rejected")}>
          Reject
        </button>
      </div>
      {error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : null}
    </article>
  );
}
