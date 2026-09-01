"use client";

// Browse and search in one instrument: the search bar, quick verification
// chips, sorting, the filter drawer, active-filter tags, and the results
// grid all live here so one state drives everything the reader sees.

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
  const [filters, setFilters] = useState({
    contributors: [],
    places: [],
    verified: "all",
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = entries.filter((entry) => {
      const matchesQuery =
        !q ||
        SEARCH_FIELDS.some(
          (field) => entry[field] && entry[field].toLowerCase().includes(q)
        );
      const okContributor =
        !filters.contributors.length ||
        filters.contributors.includes(entry.contributor);
      const okPlace = !filters.places.length || filters.places.includes(entry.place);
      const excludedByVerified =
        filters.verified !== "all" &&
        (filters.verified === "yes") !== !!entry.verified;
      return matchesQuery && okContributor && okPlace && !excludedByVerified;
    });
    const byName = (a, b) =>
      a.englishName.localeCompare(b.englishName, "en", { sensitivity: "base" });
    if (sort === "az") matched.sort(byName);
    else if (sort === "za") matched.sort((a, b) => byName(b, a));
    else
      matched.sort(
        (a, b) => Number(b.verified) - Number(a.verified) || byName(a, b)
      );
    return matched;
  }, [entries, query, filters, sort]);

  const unconfirmed = entries.filter((entry) => !entry.verified).length;
  const filterCount =
    filters.contributors.length +
    filters.places.length +
    (filters.verified !== "all" ? 1 : 0);

  const tags = [
    ...(query.trim()
      ? [{ key: "query", label: `Search “${query.trim()}”`, remove: () => setQuery("") }]
      : []),
    ...filters.contributors.map((name) => ({
      key: `c-${name}`,
      label: name,
      remove: () =>
        setFilters((f) => ({
          ...f,
          contributors: f.contributors.filter((v) => v !== name),
        })),
    })),
    ...filters.places.map((place) => ({
      key: `p-${place}`,
      label: place,
      remove: () =>
        setFilters((f) => ({ ...f, places: f.places.filter((v) => v !== place) })),
    })),
    ...(filters.verified !== "all"
      ? [
          {
            key: "verified",
            label: CHIPS.find((chip) => chip.value === filters.verified).label,
            remove: () => setFilters((f) => ({ ...f, verified: "all" })),
          },
        ]
      : []),
  ];

  return (
    <section className="explorer" aria-label="Search and browse the archive">
      <SearchBar entries={entries} query={query} onQueryChange={setQuery} />
      <div className="controls-row">
        <div className="chip-row" role="group" aria-label="Quick filters">
          {CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={
                filters.verified === chip.value ? "chip selected" : "chip"
              }
              onClick={() => setFilters((f) => ({ ...f, verified: chip.value }))}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="controls-right">
          <label className="sort-label" htmlFor="sort-select">
            Sort
            <select
              id="sort-select"
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
              <option value="unverified">Needs confirmation first</option>
            </select>
          </label>
          <button type="button" className="filter-button" onClick={() => setDrawerOpen(true)}>
            Filters{filterCount ? ` (${filterCount})` : ""}
          </button>
        </div>
      </div>
      {tags.length ? (
        <div className="tag-row">
          {tags.map((tag) => (
            <FilterTag key={tag.key} label={tag.label} onRemove={tag.remove} />
          ))}
          <button
            type="button"
            className="clear-all"
            onClick={() => {
              setQuery("");
              setFilters({ contributors: [], places: [], verified: "all" });
            }}
          >
            Clear all
          </button>
        </div>
      ) : null}
      <p className="result-count" aria-live="polite">
        {results.length} of {entries.length} objects · {unconfirmed} spelling
        {unconfirmed === 1 ? "" : "s"} still to confirm
      </p>
      {results.length ? (
        <div className="entry-grid">
          {results.map((entry, index) => (
            <div key={entry.id} className="result-slot" style={{ "--i": index }}>
              <EntryCard entry={entry} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-title">Nothing matches this combination.</p>
          <p className="empty-hint">
            Try the Khmer spelling, a shorter word, or clear the filters.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setQuery("");
              setFilters({ contributors: [], places: [], verified: "all" });
            }}
          >
            Clear everything
          </button>
        </div>
      )}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        entries={entries}
        filters={filters}
        setFilters={setFilters}
      />
    </section>
  );
}
