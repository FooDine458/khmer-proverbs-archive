import collection from "../collection.config.js";
import { getPublishedEntries, withCatalogueInfo } from "../lib/entries.js";
import Header from "../components/Header.js";
import Hero from "../components/Hero.js";
import ArchiveExplorer from "../components/ArchiveExplorer.js";
import Footer from "../components/Footer.js";

// The published list is cached (lib/entries.js), so this page can be too.
export const revalidate = 60;

export default async function Home() {
  const entries = withCatalogueInfo(await getPublishedEntries());

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
