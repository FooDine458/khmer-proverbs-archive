import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server.js";
import collection from "../../collection.config.js";
import { getMyEntries } from "../../lib/entries.js";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";

export const metadata = {
  title: `My entries · ${collection.name}`,
};

const STATUS_LABEL = {
  published: "Published",
  pending: "Waiting for review",
  rejected: "Returned for changes",
};

// Where a contributor finds what they added, including an entry an admin sent
// back. Without this the only way to a returned entry was a saved link.
export default async function MyEntriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const entries = await getMyEntries(user.id);

  return (
    <>
      <Header />
      <main>
        <section className="auth">
          <div className="container">
            <h1 className="auth-title">My entries</h1>
            {entries === null ? (
              <p className="auth-error" role="alert">
                Your entries couldn't be loaded. Refresh the page to try again.
              </p>
            ) : entries.length === 0 ? (
              <p className="auth-lead">
                You haven't added an entry yet. <a href="/contribute">Add your first one</a>.
              </p>
            ) : (
              <ul className="my-entries">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <a href={`/entries/${entry.id}`}>
                      <span lang="km" translate="no" className="my-entries-khmer">
                        {entry.khmerName}
                      </span>{" "}
                      <span translate="no">{entry.englishName}</span>
                    </a>
                    <span className={`my-entries-status my-entries-${entry.status}`}>
                      {STATUS_LABEL[entry.status] || entry.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
