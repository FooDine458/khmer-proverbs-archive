export default function Hero({ collection }) {
  return (
    <section className="masthead">
      <div className="container">
        <span className="eyebrow">{collection.source}</span>
        <h1>{collection.name}</h1>
        <p className="masthead-lead">{collection.description}</p>
        <p className="masthead-credit">
          Collected by {collection.curator} in {collection.province}.
        </p>
      </div>
    </section>
  );
}
