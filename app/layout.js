import { Manrope, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";

// Self-hosted so Khmer script renders the same for every reader instead of
// depending on whatever font (if any) happens to be installed on their
// device. next/font ships with Next.js, so this adds no new dependency.
const latin = Manrope({
  subsets: ["latin"],
  variable: "--nf-latin",
  display: "swap",
});

const khmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "700"],
  variable: "--nf-khmer",
  display: "swap",
});

export const metadata = {
  title: collection.name,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${latin.variable} ${khmer.variable}`}>
      <body>{children}</body>
    </html>
  );
}
