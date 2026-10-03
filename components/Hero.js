import HeroFigure from "./HeroFigure.js";

export default function Hero({ collection, entries }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="eyebrow">{collection.source}</span>
            <h1>{collection.name}</h1>
            <p className="hero-lead">{collection.description}</p>
            <p className="hero-credit">
              Collected by {collection.curator} in {collection.province}.
            </p>
            <a href="#archive" className="btn-primary">
              Browse the objects
            </a>
          </div>
          <HeroFigure entries={entries} />
        </div>
      </div>
    </section>
  );
}
