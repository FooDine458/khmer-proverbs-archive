import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import AuthForm from "../../components/AuthForm.js";
import collection from "../../collection.config.js";

export const metadata = {
  title: `Log in · ${collection.name}`,
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main>
        <AuthForm mode="login" />
      </main>
      <Footer />
    </>
  );
}
