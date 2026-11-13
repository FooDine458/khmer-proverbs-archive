import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import ForgotPasswordForm from "../../components/ForgotPasswordForm.js";
import collection from "../../collection.config.js";

export const metadata = {
  title: `Reset your password · ${collection.name}`,
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main>
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
