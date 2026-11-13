"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import FormField from "./FormField.js";

// Asks Supabase to email a reset link. A success notice is shown whether or
// not the address has an account, so this page can't be used to find out who
// is registered. An error here means the email couldn't be sent at all
// (too many requests, or no connection).
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await createClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error("Password reset email failed:", err);
      setError("We couldn't send the email. Wait a minute and try again.");
    }
    setLoading(false);
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="auth-card">
          <span className="eyebrow">Locked out?</span>
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-lead">Enter your account email and we'll send you a link to choose a new password.</p>
          {sent ? (
            <p className="auth-notice" role="status">
              If that email has an account, a reset link is on its way. Open it in this same browser. It can take a few minutes.
            </p>
          ) : (
            <form className="auth-form" onSubmit={onSubmit}>
              <FormField
                id="forgot-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {error ? (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Please wait…" : "Send reset link"}
              </button>
            </form>
          )}
          <p className="auth-switch">
            <a href="/login">Back to log in</a>
          </p>
        </div>
      </div>
    </section>
  );
}
