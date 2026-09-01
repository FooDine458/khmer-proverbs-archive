export default function FilterTag({ label, onRemove }) {
  return (
    <span className="filter-tag">
      {label}
      <button type="button" onClick={onRemove} aria-label={`Remove ${label}`}>
        ✕
      </button>
    </span>
  );
}
