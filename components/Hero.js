export default function Hero({ collection, featured }) {
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
              Browse objects
            </a>
          </div>
          {featured?.image ? (
            <figure className="hero-figure">
              <img
                src={featured.image}
                alt={featured.imageAlt || featured.englishName}
              />
              <figcaption>
                {featured.khmerName} · {featured.englishName}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
