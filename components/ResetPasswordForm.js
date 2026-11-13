"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import FormField from "./FormField.js";

// Opened from the link in the reset email. The link carries a one-time code,
// and the Supabase client spends it by itself as the page loads, signing the
// person in. Spending it again here would fail, so this only waits for that
// result. The link works once, and only in the browser that asked for it.
export default function ResetPasswordForm() {
  const [state, setState] = useState("checking"); // checking, ready or expired
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      setState("expired");
      return;
    }
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setState("ready");
    });
    // getSession waits for the code exchange to finish, so no session after it
    // means the link was bad, used already, or opened in another browser.
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setState((s) => (s === "checking" ? (session ? "ready" : "expired") : s)))
      .catch(() => setState("expired"));
    return () => data.subscription.unsubscribe();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (password.length < 8) return setError("Use a password of at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setError("");
    setSaving(true);
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      console.error("Password update failed:", error);
      setError("We couldn't save the new password. Try a different one, or request a new link.");
      setSaving(false);
      return;
    }
    window.location.href = "/";
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="auth-card">
          <h1 className="auth-title">Choose a new password</h1>
          {state === "checking" ? <p className="auth-lead">Checking your link…</p> : null}
          {state === "expired" ? (
            <p className="auth-error" role="alert">
              This link has expired or was already used. <a href="/forgot-password">Request a new one</a>.
            </p>
          ) : null}
          {state === "ready" ? (
            <form className="auth-form" onSubmit={onSubmit}>
              <FormField id="new-password" label="New password (at least 8 characters)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
              <FormField id="confirm-password" label="Type it again" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" required />
              {error ? (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button className="btn-primary" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save new password"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
}
