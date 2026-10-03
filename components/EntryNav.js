// Not a subcomponent, just a plain data→JSX mapper: this file stays at
// one component (EntryNav) per AGENTS.md's component-per-file rule.
function navLink(entry, direction) {
  if (!entry) return <span />;
  const word = direction === "prev" ? "Previous" : "Next";
  return (
    <a href={`/entries/${entry.id}`} className={`entry-nav-link entry-nav-${direction}`}>
      <span className="metadata">
        {word}, No. {String(entry.number).padStart(2, "0")}
      </span>
      <span className="entry-nav-khmer" lang="km">
        {entry.khmerName}
      </span>
      <span className="entry-nav-name">
        <em>{entry.romanization}</em>, {entry.englishName}
      </span>
    </a>
  );
}

export default function EntryNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav className="entry-nav" aria-label="Adjacent entries">
      {navLink(prev, "prev")}
      {navLink(next, "next")}
    </nav>
  );
}
