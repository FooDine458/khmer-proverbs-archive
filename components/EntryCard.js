// One object in the archive. Khmer name leads, then the photo, then the story.

export default function EntryCard({ entry }) {
  const { khmerName, romanization, englishName, description } = entry;
  const { image, imageAlt, contributor, place, verified } = entry;

  // Either field may be missing, so build the line from whatever we have.
  const attribution = [contributor, place].filter(Boolean).join(", ");

  return (
    <article className="entry-card">
      <span className="entry-selvedge" aria-hidden="true" />
      <div className="entry-body">
        <h2 className="entry-khmer" lang="km">
          {khmerName}
        </h2>
        <p className="entry-names">
          <span className="entry-roman">{romanization}</span>
          <span className="entry-english">{englishName}</span>
        </p>
        {image ? (
          <img
            className="entry-photo"
            src={image}
            alt={imageAlt || englishName}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        {description ? (
          <p className="entry-description">{description}</p>
        ) : (
          <p className="entry-description entry-description-empty">
            No description recorded yet.
          </p>
        )}
        <div className="entry-meta">
          {attribution ? (
            <p className="entry-attribution">Told by {attribution}</p>
          ) : null}
          {verified ? null : (
            <p className="entry-unverified">Khmer spelling not confirmed</p>
          )}
        </div>
      </div>
    </article>
  );
}
