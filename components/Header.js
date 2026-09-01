import collection from "../collection.config.js";
import ThemeToggle from "./ThemeToggle.js";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner container">
        <a href="/" className="site-logo">
          {collection.name}
        </a>
        <div className="site-header-right">
          <nav className="site-nav" aria-label="Primary">
            <a href="#archive">Archive</a>
            <a href="#about">About</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
