import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import AuthForm from "../../components/AuthForm.js";
import collection from "../../collection.config.js";

export const metadata = {
  title: `Sign up · ${collection.name}`,
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <main>
        <AuthForm mode="signup" />
      </main>
      <Footer />
    </>
  );
}
