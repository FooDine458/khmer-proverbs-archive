import collection from "../collection.config.js";

export default function Home() {
  return (
    <>
      <style>{`
        .kla-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid #1E2530;
          background: rgba(11, 13, 18, 0.75);
          backdrop-filter: blur(10px);
        }
        .kla-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 15px;
          color: #F1F4F8;
        }
        .kla-mark {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: linear-gradient(135deg, #2DD4BF, #14B8A6);
          flex-shrink: 0;
        }
        .kla-pill {
          font-size: 12px;
          font-weight: 500;
          color: #8B94A3;
          border: 1px solid #262E3A;
          border-radius: 999px;
          padding: 5px 12px;
        }
        .kla-hero {
          max-width: 720px;
          margin: 0 auto;
          padding: 96px 24px 64px;
          text-align: center;
        }
        .kla-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #2DD4BF;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.25);
          border-radius: 999px;
          padding: 6px 14px;
        }
        .kla-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2DD4BF;
        }
        .kla-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #F5F7FA;
          margin: 24px 0 16px;
        }
        .kla-desc {
          font-size: 18px;
          line-height: 1.65;
          color: #9AA4B2;
          margin: 0 auto;
          max-width: 560px;
        }
        .kla-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          font-size: 14px;
          color: #6B7482;
        }
        .kla-meta b {
          color: #C7CFDA;
          font-weight: 500;
        }
        .kla-meta-sep {
          color: #2A3240;
        }
        .kla-grid {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 96px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 680px) {
          .kla-grid {
            grid-template-columns: 1fr;
          }
        }
        .kla-card {
          background: #12161F;
          border: 1px solid #1E2530;
          border-radius: 14px;
          padding: 24px;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .kla-card:hover {
          border-color: #2DD4BF44;
          transform: translateY(-2px);
        }
        .kla-card-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #1A2029;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .kla-card-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6B7482;
          margin: 0 0 6px;
        }
        .kla-card-value {
          font-size: 16px;
          font-weight: 500;
          color: #E5E9EF;
          margin: 0;
        }
        .kla-footer {
          border-top: 1px solid #1E2530;
          padding: 32px 24px 48px;
        }
        .kla-footer-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          font-size: 13px;
          color: #5A6373;
          line-height: 1.6;
        }
      `}</style>

      <nav className="kla-nav">
        <div className="kla-brand">
          <span className="kla-mark" />
          Khmer Living Archive
        </div>
        <span className="kla-pill">Building all semester</span>
      </nav>

      <main>
        <section className="kla-hero">
          <span className="kla-eyebrow">
            <span className="kla-dot" />
            Archive in progress
          </span>
          <h1 className="kla-title">{collection.name}</h1>
          <p className="kla-desc">{collection.description}</p>
          <p className="kla-meta">
            <span>
              Curated by <b>{collection.curator}</b>
            </span>
            <span className="kla-meta-sep">•</span>
            <span>
              From <b>{collection.province}</b>
            </span>
          </p>
        </section>

        <section className="kla-grid">
          <div className="kla-card">
            <div className="kla-card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2">
                <path d="M4 4h16v16H4z" opacity="0" />
                <path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                <path d="M9 12h6M9 16h6" />
              </svg>
            </div>
            <p className="kla-card-label">Entries</p>
            <p className="kla-card-value">0 so far</p>
          </div>

          <div className="kla-card">
            <div className="kla-card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </div>
            <p className="kla-card-label">Curated by</p>
            <p className="kla-card-value">{collection.curator}</p>
          </div>

          <div className="kla-card">
            <div className="kla-card-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="2">
                <path d="M4 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v14" />
                <path d="M6 22h12a2 2 0 0 0 2-2v-1H8a2 2 0 0 0-2 2 2 2 0 0 1-2-2" />
              </svg>
            </div>
            <p className="kla-card-label">Source</p>
            <p className="kla-card-value">{collection.source}</p>
          </div>
        </section>

        <footer className="kla-footer">
          <div className="kla-footer-inner">
            <span>© 2026 Khmer Living Archive</span>
            <span>
              Built in ICT 340 — Vibe Coding, American University of Phnom
              Penh. Come back in December.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
