"use client";

import { useState } from "react";
import EntryRow from "./EntryRow.js";
import IndexPreview from "./IndexPreview.js";

export default function EntryIndex({ entries }) {
  const [activeId, setActiveId] = useState(null);
  // If the active row was filtered out, fall back to the first one left.
  const shown = entries.find((entry) => entry.id === activeId) || entries[0];

  return (
    <div className="entry-index">
      <ul className="entry-list">
        {entries.map((entry, i) => (
          <EntryRow key={entry.id} entry={entry} index={i} onActivate={setActiveId} />
        ))}
      </ul>
      <IndexPreview entry={shown} named={activeId !== null} />
    </div>
  );
}
