"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

// Client-side island that mirrors the ThemeToggle / LanguageToggle pattern:
// reads the session on mount and swaps between "email + logout" and the
// "log in / sign up" links. Login and logout both do a full navigation, so
// this re-reads the session every time the page loads.
export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // createClient throws if the Supabase env vars are missing from the build.
    // This component sits in the Header, so an unhandled throw here takes down
    // every page in the archive. Treat it as "nobody is logged in" instead:
    // browsing still works, and only the auth controls are affected.
    try {
      const supabase = createClient();
      supabase.auth
        .getUser()
        .then(({ data }) => setUser(data.user))
        .catch(() => setUser(null))
        .finally(() => setReady(true));
    } catch {
      setUser(null);
      setReady(true);
    }
  }, []);

  async function onLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!ready) return null;

  if (user) {
    return (
      <>
        <span className="header-email">{user.email}</span>
        <button type="button" className="theme-toggle" onClick={onLogout}>
          <span className="theme-toggle-label">Log out</span>
        </button>
      </>
    );
  }

  return (
    <div className="auth-links">
      <a href="/login">Log in</a>
      <a href="/signup">Sign up</a>
    </div>
  );
}
