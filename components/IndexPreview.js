// Decorative duplicate of the row the reader is on, so it is hidden from
// assistive tech. Keyed on the entry so each new photo fades in. `named` marks
// it as the photo that morphs into the entry page (see the page transitions
// block in globals.css); it stays unnamed until the reader has picked a row.
export default function IndexPreview({ entry, named }) {
  const suffix = named ? " is-named" : "";

  return (
    <figure className="index-preview" aria-hidden="true">
      {entry.image ? (
        <img key={entry.id} className={`index-preview-img${suffix}`} src={entry.image} alt="" decoding="async" />
      ) : (
        <span key={entry.id} className={`index-preview-glyph${suffix}`} lang="km">
          {entry.khmerName}
        </span>
      )}
    </figure>
  );
}
