import { notFound, redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server.js";
import collection from "../../../../collection.config.js";
import { getEntryById } from "../../../../lib/entries.js";
import Header from "../../../../components/Header.js";
import Footer from "../../../../components/Footer.js";
import EntryForm from "../../../../components/EntryForm.js";

export const metadata = {
  title: `Edit entry · ${collection.name}`,
};

// The owner check here is only a courtesy redirect. The real refusal is the
// row-level security policy on `entries`, which the form's update relies on.
export default async function EditEntryPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const entry = await getEntryById(id);
  if (!entry) notFound();
  if (entry.contributorId !== user.id) redirect(`/entries/${id}`);

  return (
    <>
      <Header />
      <main>
        <EntryForm entry={entry} />
      </main>
      <Footer />
    </>
  );
}
