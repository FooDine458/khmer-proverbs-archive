import { SITE_URL } from "../lib/siteUrl.js";
import { getPublishedEntries } from "../lib/entries.js";

// Served at /sitemap.xml: the home page plus one line per published entry.
export default async function sitemap() {
  const entries = await getPublishedEntries();
  return [
    { url: SITE_URL },
    ...entries.map((entry) => ({ url: `${SITE_URL}/entries/${entry.id}` })),
  ];
}
