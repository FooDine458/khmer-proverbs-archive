import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server.js";
import collection from "../../../collection.config.js";
import Header from "../../../components/Header.js";
import Footer from "../../../components/Footer.js";
import EntryForm from "../../../components/EntryForm.js";

export const metadata = {
  title: `New entry · ${collection.name}`,
};

export default async function NewEntryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <>
      <Header />
      <main>
        <EntryForm />
      </main>
      <Footer />
    </>
  );
}
