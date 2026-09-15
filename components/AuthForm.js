"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

const COPY = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in",
    lead: "Log in to manage your entries.",
    cta: "Log in",
    switchText: "New here?",
    switchLink: "Create an account",
    switchHref: "/signup",
    // Deliberately generic. Revealing whether the email exists (or is merely
    // unconfirmed) would let someone probe which accounts are registered.
    error: "Invalid email or password",
  },
  signup: {
    eyebrow: "Join the archive",
    title: "Create your account",
    lead: "Create an account to contribute your own entries.",
    cta: "Sign up",
    switchText: "Already have an account?",
    switchLink: "Log in",
    switchHref: "/login",
  },
};

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const c = COPY[mode];

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Always the same message, whatever Supabase actually returned.
        setError(c.error);
        setLoading(false);
        return;
      }
      window.location.href = "/";
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      if (data.session) {
        window.location.href = "/";
      } else {
        setNotice("Check your email to confirm your account.");
        setLoading(false);
      }
    }
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="auth-card">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="auth-title">{c.title}</h1>
          <p className="auth-lead">{c.lead}</p>
          <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor={`${mode}-email`}>
                Email
              </label>
              <input
                id={`${mode}-email`}
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor={`${mode}-password`}>
                Password
              </label>
              <input
                id={`${mode}-password`}
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                minLength={6}
              />
            </div>
            {error ? (
              <p className="auth-error" role="alert">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="auth-notice" role="status">
                {notice}
              </p>
            ) : null}
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Please wait…" : c.cta}
            </button>
          </form>
          <p className="auth-switch">
            {c.switchText}{" "}
            <a href={c.switchHref}>{c.switchLink}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
