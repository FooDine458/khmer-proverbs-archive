export default function ProvenanceTable({ entry, collection }) {
  const categoryLabel = entry.category === "general" ? "General history" : "Personal story";
  const rows = [
    ["Source", entry.contributor],
    ["Place", entry.place],
    ["Category", categoryLabel, `category-${entry.category}`],
    ["Collected by", [collection.curator, collection.province].filter(Boolean).join(", ")],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="provenance">
      <p className="metadata provenance-heading">Provenance</p>
      {rows.map(([label, value, valueClass]) => (
        <div className="provenance-row" key={label}>
          <span className="provenance-label">{label}</span>
          <span className={valueClass ? `provenance-value ${valueClass}` : "provenance-value"}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
