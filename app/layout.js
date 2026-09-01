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

// Runs before hydration so an explicit theme choice applies on first paint,
// instead of flashing the OS-preference theme and then swapping.
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
    <html lang="en" className={`${latin.variable} ${khmer.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
