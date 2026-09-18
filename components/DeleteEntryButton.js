"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

// Shown only to the contributor who owns this entry. RLS on the `entries`
// table enforces the same rule server-side, so this is a UI convenience,
// not the security boundary.
export default function DeleteEntryButton({ entryId, ownerId }) {
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ownerId) return;
    try {
      const supabase = createClient();
      supabase.auth
        .getUser()
        .then(({ data }) => setIsOwner(data.user?.id === ownerId))
        .catch(() => setIsOwner(false));
    } catch {
      setIsOwner(false);
    }
  }, [ownerId]);

  if (!isOwner) return null;

  async function onDelete() {
    if (!window.confirm("Delete this entry? This can't be undone.")) return;
    setDeleting(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("entries").delete().eq("id", entryId);
    if (error) {
      setError("Couldn't delete this entry. Try again.");
      setDeleting(false);
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className="entry-owner-actions">
      <button type="button" className="btn-delete" onClick={onDelete} disabled={deleting}>
        {deleting ? "Deleting…" : "Delete this entry"}
      </button>
      {error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
