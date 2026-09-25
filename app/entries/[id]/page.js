import { notFound } from "next/navigation";
import collection from "../../../collection.config.js";
import { getAllEntries } from "../../../lib/entries.js";
import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import EntryDetail from "../../../components/EntryDetail.js";

// Every entry now lives in Supabase, so none are known at build time.
// Next renders each one on demand since dynamicParams defaults to true.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const entries = await getAllEntries();
  const entry = entries.find((e) => String(e.id) === id);
  if (!entry) return { title: collection.name };
  return {
    title: `${entry.englishName} · ${collection.name}`,
    description: entry.description,
  };
}

export default async function EntryPage({ params }) {
  const { id } = await params;
  const entries = await getAllEntries();
  const entry = entries.find((e) => String(e.id) === id);
  if (!entry) notFound();

  return (
    <>
      <Header />
      <main>
        <EntryDetail entry={entry} />
      </main>
      <Footer />
    </>
  );
}
