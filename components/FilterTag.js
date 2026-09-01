// One active filter, shown as a removable tag above the results so the
// reader always knows why they are seeing what they see.

export default function FilterTag({ label, onRemove }) {
  return (
    <span className="filter-tag">
      {label}
      <button
        type="button"
        className="filter-tag-x"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
      >
        ✕
      </button>
    </span>
  );
}
