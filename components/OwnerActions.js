"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { refreshPublicList } from "../lib/refreshPublicList.js";
import { deletePhotoFile } from "../lib/entryPhoto.js";

// Edit (owner only) and Delete (owner or admin). Hiding them is a courtesy: the
// row-level security policies on `entries` are what actually refuse anyone
// else, quietly changing zero rows. So after the delete we check that a row
// really came back.
export default function OwnerActions({ entryId, ownerId }) {
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth
        .getUser()
        .then(({ data }) => {
          if (!data.user) return;
          setIsOwner(data.user.id === ownerId);
          return supabase.rpc("is_admin").then(({ data: admin }) => setIsAdmin(admin === true));
        })
        .catch(() => {
          setIsOwner(false);
          setIsAdmin(false);
        });
    } catch {
      setIsOwner(false);
      setIsAdmin(false);
    }
  }, [ownerId]);

  if (!isOwner && !isAdmin) return null;

  async function onDelete() {
    setDeleting(true);
    setError("");
    try {
      const supabase = createClient();
      // Read the photo URL first: once the row is gone there's nothing to read it from.
      const { data: before } = await supabase.from("entries").select("image_url").eq("id", entryId).maybeSingle();
      const { data, error } = await supabase.from("entries").delete().eq("id", entryId).select("id");
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("No row came back: the delete was not saved");
      await deletePhotoFile(supabase, before?.image_url);
      await refreshPublicList();
      window.location.href = "/";
    } catch (err) {
      console.error("Deleting entry failed:", err);
      setError("That change wasn't saved.");
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <div className="entry-owner-actions">
      {confirming ? (
        <p>
          Delete this entry? This can't be undone.{" "}
          <button type="button" className="btn-delete" onClick={onDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Yes, delete"}
          </button>{" "}
          <button type="button" className="btn-delete" onClick={() => setConfirming(false)} disabled={deleting}>
            Cancel
          </button>
        </p>
      ) : (
        <p>
          {isOwner ? (
            <>
              <a href={`/entries/${entryId}/edit`} className="btn-delete">Edit</a>{" "}
            </>
          ) : null}
          <button type="button" className="btn-delete" onClick={() => setConfirming(true)}>
            Delete
          </button>
        </p>
      )}
      {error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
