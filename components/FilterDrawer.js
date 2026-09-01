"use client";

// Slide-out filter panel: right-hand drawer on desktop, bottom sheet on
// small screens (handled entirely in CSS). Filters apply live so the count
// behind the scrim updates as the reader chooses.

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

  // Esc closes; Tab stays inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll("button, input");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const closeBtn = panelRef.current?.querySelector("button");
    if (closeBtn) closeBtn.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const contributors = unique(entries.map((entry) => entry.contributor));
  const places = unique(entries.map((entry) => entry.place));

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
          <p className="drawer-title">Filters</p>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close filters">
            ✕
          </button>
        </div>
        <div className="drawer-body">
          <fieldset className="drawer-section">
            <legend className="drawer-title">Contributor</legend>
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
            <legend className="drawer-title">Place</legend>
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
            <legend className="drawer-title">Spelling</legend>
            {VERIFIED_OPTIONS.map((option) => (
              <label key={option.value} className="drawer-option">
                <input
                  type="radio"
                  name="verified-filter"
                  checked={filters.verified === option.value}
                  onChange={() =>
                    setFilters((f) => ({ ...f, verified: option.value }))
                  }
                />
                {option.label}
              </label>
            ))}
          </fieldset>
        </div>
        <div className="drawer-actions">
          <button
            type="button"
            className="filter-button"
            onClick={() => setFilters({ contributors: [], places: [], verified: "all" })}
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
