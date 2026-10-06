export default function ProvenanceTable({ entry, collection }) {
  const categoryLabel = entry.category === "general" ? "General history" : "Personal story";
  const rows = [
    ["Source", entry.contributor],
    ["Place", entry.place],
    ["Category", categoryLabel],
    ["Collected by", [collection.curator, collection.province].filter(Boolean).join(", ")],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="provenance">
      <p className="metadata provenance-heading">Provenance</p>
      <dl className="provenance-list">
        {rows.map(([label, value]) => (
          <div className="provenance-row" key={label}>
            <dt className="provenance-label">{label}</dt>
            <dd className="provenance-value">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
