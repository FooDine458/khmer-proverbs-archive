export default function EntryCard({ entry }) {
  const attribution = [entry.contributor, entry.place]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="entry-card">
      <div className="entry-visual">
        {entry.image ? (
          <img
            src={entry.image}
            alt={entry.imageAlt || entry.englishName}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="entry-visual-placeholder">No image</span>
        )}
      </div>
      <div className="entry-body">
        <h3 className="entry-khmer" lang="km">
          {entry.khmerName}
        </h3>
        <p className="entry-names">
          {entry.romanization} · {entry.englishName}
        </p>
        <p className="entry-story">
          {entry.description || "No description recorded yet."}
        </p>
        <div className="entry-footer">
          {attribution ? <span>{attribution}</span> : null}
          {!entry.verified ? (
            <span className="entry-unverified">Spelling unconfirmed</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
