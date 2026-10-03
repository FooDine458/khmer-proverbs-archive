import { notFound } from "next/navigation";
import collection from "../../../collection.config.js";
import { getAllEntries, getEntryById, withCatalogueInfo } from "../../../lib/entries.js";
import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import EntryDetail from "../../../components/EntryDetail.js";

// Every entry lives in Supabase, so none are known at build time.
// Next renders each one on demand since dynamicParams defaults to true.
// Published entries are public; a pending or rejected entry only comes back
// for its owner and for admins (row-level security), everyone else gets 404.
async function findEntry(id) {
  const published = withCatalogueInfo(await getAllEntries());
  const index = published.findIndex((e) => String(e.id) === id);
  if (index !== -1) return { published, index, entry: published[index] };
  return { published, index: -1, entry: await getEntryById(id) };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { entry } = await findEntry(id);
  if (!entry) return { title: collection.name };
  return {
    title: `${entry.englishName} · ${collection.name}`,
    description: entry.description,
  };
}

export default async function EntryPage({ params }) {
  const { id } = await params;
  const { published, index, entry } = await findEntry(id);
  if (!entry) notFound();

  return (
    <>
      <Header />
      <main>
        <EntryDetail
          entry={entry}
          collection={collection}
          total={published.length}
          prev={published[index - 1] || null}
          next={published[index + 1] || null}
        />
      </main>
      <Footer />
    </>
  );
}
