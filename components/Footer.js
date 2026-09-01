import collection from "../collection.config.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          {collection.name} · {year} · Curated by {collection.curator}
        </p>
        <p className="footer-sub">ICT 340, AUPP</p>
      </div>
    </footer>
  );
}
