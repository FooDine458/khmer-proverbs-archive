"use client";

import { useEffect, useRef, useState } from "react";

const FIELDS = ["khmerName", "romanization", "englishName", "description"];

export default function SearchBar({ entries, query, onQueryChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [deferred, setDeferred] = useState(query);
  const wrapRef = useRef(null);
  const listId = "search-suggestions";

  useEffect(() => {
    const t = setTimeout(() => setDeferred(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const q = deferred.trim().toLowerCase();
  const suggestions = q
    ? entries.filter((e) => FIELDS.some((f) => e[f] && e[f].toLowerCase().includes(q))).slice(0, 5)
    : [];

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && active >= 0 && suggestions[active]) {
      onQueryChange(suggestions[active].romanization);
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className="search" ref={wrapRef}>
      <span className="search-glyph" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        className="search-input"
        value={query}
        placeholder="Search — ស្វែងរក…"
        aria-label="Search the archive"
        aria-expanded={open && q.length > 0}
        aria-controls={listId}
        aria-autocomplete="listbox"
        aria-activedescendant={active >= 0 ? `s-${active}` : undefined}
        onChange={(e) => {
          onQueryChange(e.target.value);
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
          {suggestions.map((e, i) => (
            <li
              key={e.id}
              id={`s-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? "search-suggestion active" : "search-suggestion"}
              onMouseDown={(ev) => {
                ev.preventDefault();
                onQueryChange(e.romanization);
                setOpen(false);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="search-suggestion-khmer" lang="km">
                {e.khmerName}
              </span>
              <span className="search-suggestion-sub">
                {e.romanization} — {e.englishName}
              </span>
            </li>
          ))}
          {suggestions.length === 0 ? (
            <li className="search-suggestion-none">
              No matches yet — keep typing. Khmer works too.
            </li>
          ) : (
            <li
              className="search-suggestion-all"
              onMouseDown={(ev) => {
                ev.preventDefault();
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
