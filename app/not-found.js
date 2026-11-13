import collection from "../collection.config.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

export const metadata = {
  title: `Not found · ${collection.name}`,
};

// Shown for any address that isn't in the archive, and for an entry that is
// private to someone else (the site doesn't say which, on purpose).
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="auth">
          <div className="container">
            <div className="auth-card">
              <h1 className="auth-title">We couldn't find that page</h1>
              <p className="auth-lead">
                The entry may have been removed, or the link may be wrong.{" "}
                <a href="/#archive">Browse the collection</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
