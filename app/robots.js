import { SITE_URL } from "../lib/siteUrl.js";

// Served at /robots.txt. Everything public may be crawled; the pages that need
// a login have nothing for a crawler to read.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/contribute", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
