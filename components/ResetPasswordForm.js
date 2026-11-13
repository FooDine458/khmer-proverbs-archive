"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "../utils/supabase/client";
import FormField from "./FormField.js";

// Opened from the link in the reset email. The link carries a one-time code;
// swapping it for a session is what lets this page set a new password. It
// only works in the browser that asked for the email, and only once.
export default function ResetPasswordForm() {
  const [state, setState] = useState("checking"); // checking, ready or expired
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // the code works once, so don't spend it twice
    started.current = true;
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return setState("expired");
    try {
      createClient()
        .auth.exchangeCodeForSession(code)
        .then(({ error }) => setState(error ? "expired" : "ready"))
        .catch(() => setState("expired"));
    } catch {
      setState("expired");
    }
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
