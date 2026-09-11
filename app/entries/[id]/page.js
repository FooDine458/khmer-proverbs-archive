import { notFound } from "next/navigation";
import collection from "../../../collection.config.js";
import entries from "../../../data/entries.js";
import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import EntryDetail from "../../../components/EntryDetail.js";

export function generateStaticParams() {
  return entries.map((entry) => ({ id: String(entry.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = entries.find((e) => String(e.id) === id);
  if (!entry) return { title: collection.name };
  return {
    title: `${entry.englishName} · ${collection.name}`,
    description: entry.description,
  };
}

export default async function EntryPage({ params }) {
  const { id } = await params;
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
