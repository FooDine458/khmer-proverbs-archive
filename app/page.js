import collection from "../collection.config.js";
import EntryCard, { entries } from "./components/EntryCard";

export default function Home() {
  return (
    <>
      <style>{`
        .kla-hero {
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px;
          background: radial-gradient(circle at 50% 0%, #3A1220 0%, #14181F 60%);
        }
        .kla-badge {
          display: inline-block;
          font-family: 'Courier New', monospace;
          background: #E8B94A;
          color: #14181F;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 999px;
        }
        .kla-title {
          font-size: clamp(40px, 8vw, 88px);
          font-weight: 800;
          line-height: 1.05;
          margin: 28px 0 20px;
          max-width: 900px;
          background: linear-gradient(135deg, #FFFFFF 0%, #E8B94A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .kla-desc {
          font-size: 20px;
          color: #B7C0CC;
          line-height: 1.6;
          max-width: 620px;
          margin: 0;
        }
        .kla-stat-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          margin-top: 56px;
        }
        .kla-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
        }
        .kla-stat-label {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E8B94A;
          margin-top: 6px;
        }
        .kla-section {
          max-width: 760px;
          margin: 0 auto;
          padding: 88px 24px;
          border-top: 1px solid #232B38;
        }
        .kla-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #E8B94A;
          margin: 0 0 14px;
        }
        .kla-section-title {
          font-size: 30px;
          font-weight: 700;
          color: #F5F7FA;
          margin: 0 0 20px;
        }
        .kla-body {
          font-size: 17px;
          line-height: 1.75;
          color: #AEB6C2;
          margin: 0 0 16px;
        }
        .kla-field-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 32px;
        }
        @media (max-width: 560px) {
          .kla-field-grid { grid-template-columns: 1fr; }
        }
        .kla-field {
          background: #1A1F29;
          border: 1px solid #232B38;
          border-radius: 10px;
          padding: 18px;
        }
        .kla-field-name {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: #E8B94A;
          margin: 0 0 6px;
        }
        .kla-field-desc {
          font-size: 14px;
          color: #97A1B3;
          line-height: 1.5;
          margin: 0;
        }
        .kla-roadmap {
          list-style: none;
          margin: 32px 0 0;
          padding: 0;
        }
        .kla-roadmap li {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid #232B38;
          font-size: 16px;
          color: #C7CFDA;
        }
        .kla-roadmap li:first-child {
          border-top: none;
        }
        .kla-roadmap b {
          color: #E8B94A;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          flex-shrink: 0;
          width: 88px;
        }
        .kla-footer {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          font-size: 13px;
          color: #5A6373;
          line-height: 1.6;
        }
      `}</style>

      <main>
        <section className="kla-hero">
          <span className="kla-badge">Khmer Living Archive</span>
          <h1 className="kla-title">{collection.name}</h1>
          <p className="kla-desc">{collection.description}</p>

          <div className="kla-stat-row">
            <div>
              <p className="kla-stat-value">{collection.curator}</p>
              <p className="kla-stat-label">Curated by</p>
            </div>
            <div>
              <p className="kla-stat-value">{collection.source}</p>
              <p className="kla-stat-label">Source</p>
            </div>
            <div>
              <p className="kla-stat-value">{collection.province}</p>
              <p className="kla-stat-label">Focus region</p>
            </div>
          </div>
        </section>

        <section className="kla-section">
          <p className="kla-eyebrow">About</p>
          <h2 className="kla-section-title">Why this archive exists</h2>
          <p className="kla-body">
            Cambodia&rsquo;s proverbs carry generations of practical wisdom
            about work, family, patience, and knowing your own limits &mdash;
            wisdom that has always traveled more by speech than by print.
            This archive collects proverbs from Khmer books and literature
            and writes each one down properly: the Khmer text, what it means,
            and where it came from.
          </p>
          <p className="kla-body">
            It&rsquo;s built and maintained by {collection.curator}, drawing
            on {collection.source.toLowerCase()} with a focus on{" "}
            {collection.province}.
          </p>
        </section>

        <section className="kla-section">
          <p className="kla-eyebrow">Data shape</p>
          <h2 className="kla-section-title">What each entry holds</h2>
          <p className="kla-body">
            Every proverb in the archive is recorded the same way, so future
            entries can be browsed and searched consistently.
          </p>
          <div className="kla-field-grid">
            <div className="kla-field">
              <p className="kla-field-name">title</p>
              <p className="kla-field-desc">Short English label for the proverb.</p>
            </div>
            <div className="kla-field">
              <p className="kla-field-name">khmerName</p>
              <p className="kla-field-desc">The proverb itself, in Khmer script.</p>
            </div>
            <div className="kla-field">
              <p className="kla-field-name">story</p>
              <p className="kla-field-desc">What it means, and when Khmers say it.</p>
            </div>
            <div className="kla-field">
              <p className="kla-field-name">source</p>
              <p className="kla-field-desc">The book or text it was drawn from.</p>
            </div>
            <div className="kla-field">
              <p className="kla-field-name">tags</p>
              <p className="kla-field-desc">Categories for browsing, e.g. wisdom, work.</p>
            </div>
            <div className="kla-field">
              <p className="kla-field-name">place</p>
              <p className="kla-field-desc">Region the proverb is tied to, if known.</p>
            </div>
          </div>
        </section>

        <section className="kla-section">
          <p className="kla-eyebrow">Status</p>
          <h2 className="kla-section-title">Where things stand</h2>
          <p className="kla-body">entries in the archive: {entries.length} (and growing)</p>
          <ul className="kla-roadmap">
            <li>
              <b>Done</b>
              Sketched the shape of one entry &mdash; the fields above.
            </li>
            <li>
              <b>Next</b>
              Add the first real entries and let visitors browse and search them.
            </li>
            <li>
              <b>Later</b>
              Contributor accounts, so people can submit and own entries
              through a review-and-publish flow.
            </li>
          </ul>
        </section>

        <section className="kla-section">
          <p className="kla-eyebrow">Entries</p>
          <h2 className="kla-section-title">Browse the archive</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {entries.map((entry, index) => (
              <EntryCard key={index} entry={entry} />
            ))}
          </div>
        </section>

        <footer className="kla-footer">
          Built in ICT 340 &mdash; Vibe Coding, American University of Phnom
          Penh, Fall 2026. This archive is under construction all semester.
          Come back in December.
        </footer>
      </main>
    </>
  );
}