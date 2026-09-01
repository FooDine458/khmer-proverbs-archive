import collection from "../collection.config.js";
import entries from "../data/entries.js";
import EntryCard from "../components/EntryCard.js";

export default function Home() {
  const unconfirmed = entries.filter((entry) => !entry.verified).length;

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">{collection.source}</p>
        <h1 className="page-title">{collection.name}</h1>
        <p className="page-intro">{collection.description}</p>
        <p className="page-credit">
          Collected by {collection.curator} in {collection.province}.
        </p>
      </header>

      <div className="page-rule" aria-hidden="true" />

      <section aria-label="Objects in the archive">
        <h2 className="entries-heading">
          {entries.length} objects, {unconfirmed} spellings still to confirm
        </h2>
        <div className="entry-grid">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </main>
  );
}
