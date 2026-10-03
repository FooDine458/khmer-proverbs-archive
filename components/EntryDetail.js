import OwnerActions from "./OwnerActions.js";
import ProvenanceTable from "./ProvenanceTable.js";
import EntryNav from "./EntryNav.js";

// Lead is the short catalogue description; story is the longer narrative.
// Combined so both render, description first, matching the design's split
// between a bold opening line and the paragraphs that follow it.
function storyParagraphs(entry) {
  const rest = entry.story && entry.story.length ? entry.story : [];
  return entry.description ? [entry.description, ...rest] : rest.length ? rest : ["No description recorded yet."];
}

export default function EntryDetail({ entry, collection, total, prev, next }) {
  const paragraphs = storyParagraphs(entry);

  return (
    <article className="entry-detail">
      <div className="container entry-detail-inner">
        <div className="entry-detail-breadcrumb">
          <a href="/" className="back-link">
            Collection
          </a>
          <span>/</span>
          <span>
            {entry.status === "published"
              ? `No. ${String(entry.number).padStart(2, "0")} of ${String(total).padStart(2, "0")}`
              : entry.status === "pending"
                ? "Pending approval, not yet public"
                : "Not approved, not public"}
          </span>
        </div>
        <div className="entry-detail-grid">
          <div className="entry-detail-head">
            <h1 className="entry-detail-khmer" lang="km">
              {entry.khmerName}
            </h1>
            <p className="entry-detail-names">
              <em>{entry.romanization}</em>, {entry.englishName}
            </p>
            {entry.contributorId ? (
              <OwnerActions entryId={entry.id} ownerId={entry.contributorId} />
            ) : null}
          </div>
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
        </div>
        <div className="entry-detail-main">
          <div className="entry-detail-story">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "entry-detail-lead" : undefined}>
                {paragraph}
              </p>
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
          <ProvenanceTable entry={entry} collection={collection} />
        </div>
      </div>
      <div className="container">
        <EntryNav prev={prev} next={next} />
      </div>
    </article>
  );
}
