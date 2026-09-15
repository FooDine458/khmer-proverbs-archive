"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client, for Client Components.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    // Supabase renamed the anon key to the publishable key. Accept either
    // name so the same code works whichever one is set in .env.local and in
    // the Vercel environment variables.
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
