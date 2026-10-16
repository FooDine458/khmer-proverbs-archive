import { createClient } from "@supabase/supabase-js";

// Supabase client with no session and no cookies, for reading the public
// list of published entries. Because it never touches cookies, a page that
// only uses this client can be cached instead of rendered on every visit.
// Row-level security still applies: it can only ever see what a logged-out
// visitor can see.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
