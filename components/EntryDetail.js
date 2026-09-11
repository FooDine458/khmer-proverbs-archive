export default function EntryDetail({ entry }) {
  const attribution = [entry.contributor, entry.place].filter(Boolean).join(" · ");
  const story = entry.story && entry.story.length ? entry.story : [entry.description];

  return (
    <article className="entry-detail">
      <div className="container entry-detail-inner">
        <a href="/" className="back-link">
          ← Back to the collection
        </a>
        <div className="entry-detail-grid">
          <div className="entry-detail-media">
            {entry.image ? (
              <img
                src={entry.image}
                alt={entry.imageAlt || entry.englishName}
                decoding="async"
              />
            ) : (
              <span className="entry-card-glyph" lang="km" aria-hidden="true">
                {entry.khmerName}
              </span>
            )}
          </div>
          <div className="entry-detail-head">
            <h1 className="entry-detail-khmer" lang="km">
              {entry.khmerName}
            </h1>
            <p className="entry-names">
              {entry.romanization} · {entry.englishName}
            </p>
            {attribution ? <span className="entry-source-pill">{attribution}</span> : null}
          </div>
        </div>
        <div className="entry-detail-story">
          {story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {entry.sources && entry.sources.length ? (
            <p className="entry-detail-sources">
              Source:{" "}
              {entry.sources.map((source, i) => (
                <span key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                  {i < entry.sources.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
