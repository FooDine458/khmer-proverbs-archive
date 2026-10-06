const SOURCES = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal stories" },
  { value: "general", label: "General history" },
];

const SORTS = [
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

// Plain data→JSX helper, not a second component: one component per file.
function toggleGroup(label, options, value, onChange) {
  return (
    <div className="toggle-group" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="toggle"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function ControlBar({ source, onSourceChange, sort, onSortChange }) {
  return (
    <div className="controls">
      {toggleGroup("Filter by source", SOURCES, source, onSourceChange)}
      {toggleGroup("Sort", SORTS, sort, onSortChange)}
    </div>
  );
}
