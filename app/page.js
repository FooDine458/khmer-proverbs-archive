import collection from "../collection.config.js";
import { getAllEntries, withCatalogueInfo } from "../lib/entries.js";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import ArchiveExplorer from "../components/ArchiveExplorer.js";
import Footer from "../components/Footer.js";

export default async function Home() {
  const entries = withCatalogueInfo(await getAllEntries());

  return (
    <>
      <Header />
      <main>
        <Hero collection={collection} />
        <ArchiveExplorer entries={entries} />
      </main>
      <Footer />
    </>
  );
}
