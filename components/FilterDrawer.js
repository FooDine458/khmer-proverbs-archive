"use client";

import { useEffect, useRef } from "react";

const toggleIn = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

const unique = (values) => [...new Set(values.filter(Boolean))];

const VERIFIED_OPTIONS = [
  { value: "all", label: "All objects" },
  { value: "yes", label: "Confirmed spellings only" },
  { value: "no", label: "Needs confirmation" },
];

export default function FilterDrawer({ open, onClose, entries, filters, setFilters }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll("button, input");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const contributors = unique(entries.map((e) => e.contributor));
  const places = unique(entries.map((e) => e.place));

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} aria-hidden="true" />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        ref={panelRef}
      >
        <div className="drawer-head">
          <h2>Filters</h2>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
        <div className="drawer-body">
          <fieldset className="drawer-section">
            <legend className="drawer-section-title">Contributor</legend>
            {contributors.map((name) => (
              <label key={name} className="drawer-option">
                <input
                  type="checkbox"
                  checked={filters.contributors.includes(name)}
                  onChange={() =>
                    setFilters((f) => ({
                      ...f,
                      contributors: toggleIn(f.contributors, name),
                    }))
                  }
                />
                {name}
              </label>
            ))}
          </fieldset>
          <fieldset className="drawer-section">
            <legend className="drawer-section-title">Place</legend>
            {places.map((place) => (
              <label key={place} className="drawer-option">
                <input
                  type="checkbox"
                  checked={filters.places.includes(place)}
                  onChange={() =>
                    setFilters((f) => ({ ...f, places: toggleIn(f.places, place) }))
                  }
                />
                {place}
              </label>
            ))}
          </fieldset>
          <fieldset className="drawer-section">
            <legend className="drawer-section-title">Spelling</legend>
            {VERIFIED_OPTIONS.map((opt) => (
              <label key={opt.value} className="drawer-option">
                <input
                  type="radio"
                  name="verified-filter"
                  checked={filters.verified === opt.value}
                  onChange={() => setFilters((f) => ({ ...f, verified: opt.value }))}
                />
                {opt.label}
              </label>
            ))}
          </fieldset>
        </div>
        <div className="drawer-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setFilters({ contributors: [], places: [], verified: "all" })
            }
          >
            Reset
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>
    </>
  );
}
