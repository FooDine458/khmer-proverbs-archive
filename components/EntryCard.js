export default function EntryCard({ entry }) {
  const attribution = [entry.contributor, entry.place].filter(Boolean).join(", ");
  const categoryLabel = entry.category === "general" ? "General history" : "Personal story";

  return (
    <article className="entry-card">
      <div className="entry-card-media">
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.imageAlt || entry.englishName}
            loading="lazy"
            decoding="async"
          />
        ) : (
          // No photo yet: show the Khmer name as the visual instead of an empty
          // box. aria-hidden because the same text is already in the heading.
          <span className="entry-card-glyph" lang="km" aria-hidden="true">
            {entry.khmerName}
          </span>
        )}
      </div>
      <div className="entry-card-eyebrow">
        <span className="metadata">NO. {String(entry.number).padStart(2, "0")}</span>
        <span className={`metadata entry-card-category category-${entry.category}`}>
          {categoryLabel}
        </span>
      </div>
      <div className="entry-card-body">
        <h3 className="entry-khmer" lang="km">
          {entry.khmerName}
        </h3>
        <p className="entry-names">
          <em>{entry.romanization}</em>, {entry.englishName}
        </p>
        <p className="entry-story">{entry.description || "No description recorded yet."}</p>
        {attribution ? <p className="entry-attribution">{attribution}</p> : null}
      </div>
      <a
        className="entry-card-link"
        href={`/entries/${entry.id}`}
        aria-label={`Read more about ${entry.khmerName}, ${entry.englishName}`}
      />
    </article>
  );
}
