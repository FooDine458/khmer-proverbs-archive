"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "system");
  }, []);

  const cycle = () => {
    const order = ["system", "light", "dark"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
    if (next === "system") {
      document.documentElement.removeAttribute("data-theme");
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const labels = { system: "System", light: "Light", dark: "Dark" };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${labels[theme] || "System"}. Click to change.`}
    >
      {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🌓"}
      <span className="theme-toggle-label">{labels[theme] || "System"}</span>
    </button>
  );
}
