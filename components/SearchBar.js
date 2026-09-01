"use client";

// The archive's search instrument. Matches Khmer script, romanization,
// English name, and description; suggestions appear after a short debounce
// so the panel never flickers while typing.

import { useEffect, useRef, useState } from "react";

const SEARCH_FIELDS = ["khmerName", "romanization", "englishName", "description"];

export default function SearchBar({ entries, query, onQueryChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [deferred, setDeferred] = useState(query);
  const wrapRef = useRef(null);
  const listId = "search-suggestion-list";

  // Debounce: suggestions follow the query 150ms behind the typing.
  useEffect(() => {
    const timer = setTimeout(() => setDeferred(query), 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Click or tap anywhere outside closes the suggestion panel.
  useEffect(() => {
    const onDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const q = deferred.trim().toLowerCase();
  const suggestions = q
    ? entries
        .filter((entry) =>
          SEARCH_FIELDS.some(
            (field) =>
              entry[field] && entry[field].toLowerCase().includes(q)
          )
        )
        .slice(0, 5)
    : [];

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (suggestions.length ? Math.min(i + 1, suggestions.length - 1) : -1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (event.key === "Enter" && active >= 0 && suggestions[active]) {
      onQueryChange(suggestions[active].romanization);
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className="search-bar" ref={wrapRef}>
      <span className="search-glyph" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        className="search-input"
        value={query}
        placeholder="Search the archive — ស្វែងរក…"
        aria-label="Search the archive"
        aria-expanded={open && q.length > 0}
        aria-controls={listId}
        aria-autocomplete="listbox"
        aria-activedescendant={active >= 0 ? `suggestion-${active}` : undefined}
        onChange={(event) => {
          onQueryChange(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {query ? (
        <button
          type="button"
          className="search-clear"
          aria-label="Clear search"
          onClick={() => {
            onQueryChange("");
            setOpen(false);
          }}
        >
          ✕
        </button>
      ) : null}
      {open && q.length > 0 ? (
        <ul className="search-suggestions" id={listId} role="listbox">
          {suggestions.map((entry, index) => (
            <li
              key={entry.id}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === active}
              className={
                index === active
                  ? "search-suggestion active"
                  : "search-suggestion"
              }
              // mousedown, not click, so choosing beats the outside-tap close.
              onMouseDown={(event) => {
                event.preventDefault();
                onQueryChange(entry.romanization);
                setOpen(false);
                setActive(-1);
              }}
              onMouseEnter={() => setActive(index)}
            >
              <span className="search-suggestion-khmer" lang="km">
                {entry.khmerName}
              </span>
              <span className="search-suggestion-sub">
                {entry.romanization} — {entry.englishName}
              </span>
            </li>
          ))}
          {suggestions.length === 0 ? (
            <li className="search-suggestion-none">
              No matches yet — keep typing. Khmer script works too.
            </li>
          ) : (
            <li
              className="search-suggestion-all"
              onMouseDown={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              See all results for “{deferred.trim()}”
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}
