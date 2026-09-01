import { Plus_Jakarta_Sans, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";

const latin = Plus_Jakarta_Sans({
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
