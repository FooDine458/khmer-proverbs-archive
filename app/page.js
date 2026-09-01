import collection from "../collection.config.js";
import entries from "../data/entries.js";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import ArchiveExplorer from "../components/ArchiveExplorer.js";
import Footer from "../components/Footer.js";

export default function Home() {
  const featured = entries[entries.length - 1];

  return (
    <>
      <Header />
      <main>
        <Hero collection={collection} featured={featured} />
        <ArchiveExplorer entries={entries} />
      </main>
      <Footer />
    </>
  );
}
