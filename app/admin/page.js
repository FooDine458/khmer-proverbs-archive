import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server.js";
import collection from "../../collection.config.js";
import { getPendingEntries } from "../../lib/entries.js";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import ReviewCard from "../../components/ReviewCard.js";

export const metadata = {
  title: `Review entries · ${collection.name}`,
};

// The redirect is a courtesy. Non-admins can't read pending rows or change
// any status anyway: that's enforced by the row-level security policies.
export default async function AdminPage() {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/");

  const pending = await getPendingEntries();

  return (
    <>
      <Header />
      <main>
        <section className="auth">
          <div className="container">
            <h1 className="auth-title">Entries waiting for review</h1>
            {pending.length === 0 ? (
              <p className="auth-lead">Nothing is waiting. New submissions will show up here.</p>
            ) : (
              pending.map((entry) => <ReviewCard key={entry.id} entry={entry} />)
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
