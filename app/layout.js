import { Poppins, Noto_Serif_Khmer } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import collection from "../collection.config.js";
import { SITE_URL } from "../lib/siteUrl.js";

// Bold (700) is the default; regular (400) is for <p> text.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--nf-poppins",
  display: "swap",
});

const khmer = Noto_Serif_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "700"],
  variable: "--nf-khmer",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: collection.name,
  description: collection.description,
  // What shows when the link is pasted into Telegram, Facebook or Messenger.
  openGraph: {
    title: collection.name,
    description: collection.description,
    siteName: collection.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Runs before hydration so a saved light/dark choice applies on first paint,
// instead of flashing the default theme and then swapping.
const THEME_BOOTSTRAP = `
try {
  var t = window.localStorage.getItem("theme");
  if (t === "light" || t === "dark") {
    document.documentElement.setAttribute("data-theme", t);
  }
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${khmer.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {THEME_BOOTSTRAP}
        </Script>
        {children}
      </body>
    </html>
  );
}
