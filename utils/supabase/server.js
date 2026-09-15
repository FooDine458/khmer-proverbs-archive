import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client, for Server Components, Route Handlers,
// and Server Actions. Reads the session cookie and writes any refreshed
// tokens back to the cookie store.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    // Supabase renamed the anon key to the publishable key. Accept either
    // name so the same code works whichever one is set in .env.local and in
    // the Vercel environment variables.
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component. Safe to ignore when middleware
            // is refreshing the session.
          }
        },
      },
    }
  );
}
