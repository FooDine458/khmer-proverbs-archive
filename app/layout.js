import { Newsreader, Schibsted_Grotesk, Noto_Serif_Khmer } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import collection from "../collection.config.js";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--nf-serif",
  display: "swap",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--nf-grotesk",
  display: "swap",
});

const khmer = Noto_Serif_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "700"],
  variable: "--nf-khmer",
  display: "swap",
});

export const metadata = {
  title: collection.name,
  description: collection.description,
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
      className={`${serif.variable} ${grotesk.variable} ${khmer.variable}`}
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
