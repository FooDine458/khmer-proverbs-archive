import { createClient } from "../../utils/supabase/server.js";
import collection from "../../collection.config.js";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import EntryForm from "../../components/EntryForm.js";

export const metadata = {
  title: `Contribute · ${collection.name}`,
};

export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header />
      <main>
        {user ? (
          <EntryForm />
        ) : (
          <section className="auth">
            <div className="container">
              <div className="auth-card">
                <h1 className="auth-title">Log in to contribute</h1>
                <p className="auth-lead">
                  You need an account to add an entry. <a href="/login">Log in</a> or{" "}
                  <a href="/signup">sign up</a>.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
