// The site's public address, for absolute links in the sitemap and in link
// previews. Vercel fills VERCEL_PROJECT_PRODUCTION_URL in automatically (no
// https:// in front), so nothing is hard-coded; locally it falls back to dev.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
