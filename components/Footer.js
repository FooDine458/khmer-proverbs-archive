// Closing line for the page. Kept to one fact and one credit, both pulled
// from collection.config.js so nothing here goes stale on its own.

import collection from "../collection.config.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="footer-text">
        {collection.name} · started {year} · ICT 340, AUPP
      </p>
    </footer>
  );
}
