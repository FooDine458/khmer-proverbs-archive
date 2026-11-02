"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { refreshPublicList } from "../lib/refreshPublicList.js";

// One pending entry with Approve / Return for changes. "Return" is stored as
// status "rejected"; the contributor can edit and resubmit it.
//
// The update only matches the version this page loaded (same id AND same
// updated_at). If the contributor saved an edit after the page opened, the
// database moved updated_at, zero rows change, and nothing unread goes public.
// Zero rows is also how row-level security refuses a non-admin.
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
        .eq("updated_at", entry.updatedAt)
        .select("id");
      if (error) throw error;
      if (!data || data.length === 0) {
        setError("This entry was edited after you opened this page, so nothing was saved. Reload to review the latest version.");
        setBusy(false);
        return;
      }
      await refreshPublicList();
      window.location.reload();
    } catch (err) {
      console.error("Reviewing entry failed:", err);
      setError("That change wasn't saved.");
      setBusy(false);
    }
  }

  return (
    <article className="review-card">
      <h2 lang="km" translate="no">{entry.khmerName}</h2>
      <p translate="no">
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
          Return for changes
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
