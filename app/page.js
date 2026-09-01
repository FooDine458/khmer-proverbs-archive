import collection from "../collection.config.js";
import entries from "../data/entries.js";
import ArchiveExplorer from "../components/ArchiveExplorer.js";
import Footer from "../components/Footer.js";

export default function Home() {
  // Last entry in the list as the hero object, so adding a new one at the
  // end automatically becomes the new face of the archive. No entry is
  // hard-coded twice.
  const featured = entries[entries.length - 1];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">{collection.source}</p>
            <h1 className="hero-title">{collection.name}</h1>
            <p className="hero-intro">{collection.description}</p>
            <p className="hero-credit">
              Collected by {collection.curator} in {collection.province}.
            </p>
          </div>
          {featured?.image ? (
            <div className="hero-visual">
              <div className="hero-frame">
                <div className="hero-photo-well">
                  <img
                    className="hero-photo"
                    src={featured.image}
                    alt={featured.imageAlt || featured.englishName}
                  />
                </div>
              </div>
              <p className="hero-caption">
                {featured.romanization}, {featured.englishName.toLowerCase()}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <div className="page-rule" aria-hidden="true" />

      <ArchiveExplorer entries={entries} />

      <Footer />
    </main>
  );
}
