export default function EntryRow({ entry, onActivate }) {
  return (
    <li className="entry-row">
      <a
        className="entry-row-link"
        href={`/entries/${entry.id}`}
        onMouseEnter={() => onActivate(entry.id)}
        onFocus={() => onActivate(entry.id)}
      >
        <span className="metadata entry-row-number">
          {String(entry.number).padStart(2, "0")}
        </span>
        <span className="entry-row-khmer" lang="km">
          {entry.khmerName}
        </span>
        <span className="entry-row-names">
          <em>{entry.romanization}</em>, {entry.englishName}
        </span>
        {entry.image ? (
          // Decorative: the name beside it already says what the object is.
          <img className="entry-row-thumb" src={entry.image} alt="" loading="lazy" decoding="async" />
        ) : null}
      </a>
    </li>
  );
}
