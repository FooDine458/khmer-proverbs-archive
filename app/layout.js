import { Plus_Jakarta_Sans, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";
import collection from "../collection.config.js";

// TEMPORARY build-time diagnostic — remove once the Vercel env vars are
// confirmed. Logs only the NAMES of NEXT_PUBLIC_* variables visible to the
// build, never their values, so it is safe in a public repo.
console.log(
  "[env-check] NEXT_PUBLIC keys seen by this build:",
  JSON.stringify(
    Object.keys(process.env).filter((k) => k.startsWith("NEXT_PUBLIC"))
  ),
  "| URL set:",
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  "| ANON_KEY set:",
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
);

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
    <html lang="en" className={`${latin.variable} ${khmer.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        {children}
      </body>
    </html>
  );
}
