import collection from "../collection.config.js";
import { getAllEntries } from "../lib/entries.js";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import ArchiveExplorer from "../components/ArchiveExplorer.js";
import Footer from "../components/Footer.js";

export default async function Home() {
  const entries = await getAllEntries();
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
