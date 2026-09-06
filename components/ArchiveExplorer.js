"use client";

import { useMemo, useState } from "react";
import EntryCard from "./EntryCard.js";
import SearchBar from "./SearchBar.js";
import FilterTag from "./FilterTag.js";

const SEARCH_FIELDS = ["khmerName", "romanization", "englishName", "description"];
// Entries with this contributor are researched general history; everything
// else (e.g. "Grandmother") is a personal, family-sourced account.
const GENERAL_CONTRIBUTOR = "Common in Khmer households";

const SOURCE_CHIPS = [
  { value: "all", label: "All sources" },
  { value: "personal", label: "Personal stories" },
  { value: "general", label: "General history" },
];

export default function ArchiveExplorer({ entries }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az");
  const [source, setSource] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((entry) => {
      const matchesQuery =
        !q || SEARCH_FIELDS.some((f) => entry[f] && entry[f].toLowerCase().includes(q));
      const isGeneral = entry.contributor === GENERAL_CONTRIBUTOR;
      const okSource = source === "all" || (source === "general") === isGeneral;
      return matchesQuery && okSource;
    });
    const byName = (a, b) => a.englishName.localeCompare(b.englishName, "en", { sensitivity: "base" });
    list.sort(sort === "za" ? (a, b) => byName(b, a) : byName);
    return list;
  }, [entries, query, source, sort]);

  const clearAll = () => {
    setQuery("");
    setSource("all");
  };

  return (
    <section className="archive" id="archive" aria-label="Browse the archive">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">The collection</h2>
          <p className="section-meta">
            {entries.length} objects in the archive
          </p>
        </div>
        <SearchBar entries={entries} query={query} onQueryChange={setQuery} />
        <div className="controls">
          <div className="chips" role="group" aria-label="Filter by source">
            {SOURCE_CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className="chip"
                aria-pressed={source === chip.value}
                onClick={() => setSource(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sort}
            aria-label="Sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </div>
        {query.trim() || source !== "all" ? (
          <div className="tag-row">
            {query.trim() ? (
              <FilterTag label={`Search “${query.trim()}”`} onRemove={() => setQuery("")} />
            ) : null}
            {source !== "all" ? (
              <FilterTag
                label={SOURCE_CHIPS.find((c) => c.value === source).label}
                onRemove={() => setSource("all")}
              />
            ) : null}
            <button type="button" className="clear-all" onClick={clearAll}>
              Clear all
            </button>
          </div>
        ) : null}
        <p className="result-count" aria-live="polite">
          {results.length} object{results.length === 1 ? "" : "s"} found
        </p>
        {results.length ? (
          <div className="entry-list">
            {results.map((entry, i) => (
              <div key={entry.id} className="result-slot" style={{ "--i": i }}>
                <EntryCard entry={entry} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              <strong>Nothing matches this combination.</strong>
            </p>
            <p>Try the Khmer spelling, a shorter word, or clear the filters.</p>
            <button type="button" className="btn-primary" onClick={clearAll}>
              Clear everything
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
