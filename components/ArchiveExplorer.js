"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar.js";
import ControlBar from "./ControlBar.js";
import EntryIndex from "./EntryIndex.js";
import { isGeneralHistory } from "../lib/catalogue.js";

const SEARCH_FIELDS = ["khmerName", "romanization", "englishName", "description"];

export default function ArchiveExplorer({ entries }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az");
  const [source, setSource] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((entry) => {
      const matchesQuery =
        !q || SEARCH_FIELDS.some((f) => entry[f] && entry[f].toLowerCase().includes(q));
      const okSource = source === "all" || (source === "general") === isGeneralHistory(entry);
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
          <p className="section-meta" aria-live="polite">
            {results.length} of {entries.length} objects
          </p>
        </div>
        <SearchBar entries={entries} query={query} onQueryChange={setQuery} />
        <ControlBar
          source={source}
          onSourceChange={setSource}
          sort={sort}
          onSortChange={setSort}
        />
        {results.length ? (
          <EntryIndex entries={results} />
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
