// Decorative duplicate of the row the reader is on, so it is hidden from
// assistive tech. Keyed on the entry so each new photo fades in.
export default function IndexPreview({ entry }) {
  return (
    <figure className="index-preview" aria-hidden="true">
      {entry.image ? (
        <img key={entry.id} className="index-preview-img" src={entry.image} alt="" decoding="async" />
      ) : (
        <span key={entry.id} className="index-preview-glyph" lang="km">
          {entry.khmerName}
        </span>
      )}
    </figure>
  );
}
