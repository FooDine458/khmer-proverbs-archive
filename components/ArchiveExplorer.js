"use client";

import { useMemo, useState } from "react";
import EntryCard from "./EntryCard.js";
import SearchBar from "./SearchBar.js";
import FilterDrawer from "./FilterDrawer.js";
import FilterTag from "./FilterTag.js";

const SEARCH_FIELDS = ["khmerName", "romanization", "englishName", "description"];
const CHIPS = [
  { value: "all", label: "All objects" },
  { value: "yes", label: "Confirmed" },
  { value: "no", label: "Needs confirmation" },
];

export default function ArchiveExplorer({ entries }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("az");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ contributors: [], places: [], verified: "all" });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((entry) => {
      const matchesQuery = !q || SEARCH_FIELDS.some((f) => entry[f] && entry[f].toLowerCase().includes(q));
      const okContributor = !filters.contributors.length || filters.contributors.includes(entry.contributor);
      const okPlace = !filters.places.length || filters.places.includes(entry.place);
      const excluded = filters.verified !== "all" && (filters.verified === "yes") !== !!entry.verified;
      return matchesQuery && okContributor && okPlace && !excluded;
    });
    const byName = (a, b) => a.englishName.localeCompare(b.englishName, "en", { sensitivity: "base" });
    if (sort === "az") list.sort(byName);
    else if (sort === "za") list.sort((a, b) => byName(b, a));
    else list.sort((a, b) => Number(b.verified) - Number(a.verified) || byName(a, b));
    return list;
  }, [entries, query, filters, sort]);

  const unconfirmed = entries.filter((e) => !e.verified).length;
  const filterCount = filters.contributors.length + filters.places.length + (filters.verified !== "all" ? 1 : 0);

  const tags = [
    ...(query.trim() ? [{ key: "q", label: `Search “${query.trim()}”`, remove: () => setQuery("") }] : []),
    ...filters.contributors.map((name) => ({ key: `c-${name}`, label: name, remove: () => setFilters((f) => ({ ...f, contributors: f.contributors.filter((v) => v !== name) })) })),
    ...filters.places.map((place) => ({ key: `p-${place}`, label: place, remove: () => setFilters((f) => ({ ...f, places: f.places.filter((v) => v !== place) })) })),
    ...(filters.verified !== "all" ? [{ key: "v", label: CHIPS.find((c) => c.value === filters.verified).label, remove: () => setFilters((f) => ({ ...f, verified: "all" })) }] : []),
  ];

  const clearAll = () => {
    setQuery("");
    setFilters({ contributors: [], places: [], verified: "all" });
  };

  return (
    <section className="archive" id="archive" aria-label="Browse the archive">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">The collection</h2>
          <p className="section-meta">{entries.length} objects · {unconfirmed} spellings still to confirm</p>
        </div>
        <SearchBar entries={entries} query={query} onQueryChange={setQuery} />
        <div className="controls">
          <div className="chips" role="group" aria-label="Quick filters">
            {CHIPS.map((chip) => (
              <button
                key={chip.value}
                type="button"
                className="chip"
                aria-pressed={filters.verified === chip.value}
                onClick={() => setFilters((f) => ({ ...f, verified: chip.value }))}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <div className="tools">
            <select className="sort-select" value={sort} aria-label="Sort" onChange={(e) => setSort(e.target.value)}>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
              <option value="unverified">Needs confirmation first</option>
            </select>
            <button
              type="button"
              className={filterCount ? "filter-toggle filter-toggle-active" : "filter-toggle"}
              onClick={() => setDrawerOpen(true)}
            >
              Filters{filterCount ? ` (${filterCount})` : ""}
            </button>
          </div>
        </div>
        {tags.length ? (
          <div className="tag-row">
            {tags.map((tag) => <FilterTag key={tag.key} label={tag.label} onRemove={tag.remove} />)}
            <button type="button" className="clear-all" onClick={clearAll}>Clear all</button>
          </div>
        ) : null}
        <p className="result-count" aria-live="polite">{results.length} object{results.length === 1 ? "" : "s"} found</p>
        {results.length ? (
          <div className="entry-grid">
            {results.map((entry, i) => (
              <div key={entry.id} className="result-slot" style={{ "--i": i }}>
                <EntryCard entry={entry} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p><strong>Nothing matches this combination.</strong></p>
            <p>Try the Khmer spelling, a shorter word, or clear the filters.</p>
            <button type="button" className="btn-primary" onClick={clearAll}>Clear everything</button>
          </div>
        )}
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} entries={entries} filters={filters} setFilters={setFilters} />
      </div>
    </section>
  );
}
