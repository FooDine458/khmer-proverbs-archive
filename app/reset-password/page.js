import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import ResetPasswordForm from "../../components/ResetPasswordForm.js";
import collection from "../../collection.config.js";

export const metadata = {
  title: `Choose a new password · ${collection.name}`,
};

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main>
        <ResetPasswordForm />
      </main>
      <Footer />
    </>
  );
}
