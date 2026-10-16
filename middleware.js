import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Runs before every page. Two jobs:
//
// 1. Keep the login alive. Supabase access tokens expire after about an hour.
//    Server Components can read cookies but cannot write them, so without
//    this step a long-open tab quietly becomes "logged out" on the server.
//    getUser() here refreshes the token and writes the new cookies.
//    It only runs when a Supabase cookie exists, so anonymous visitors
//    pay nothing for it.
//
// 2. Add browser security headers. A strict Content-Security-Policy would
//    need a nonce for Next's inline scripts, so this one limits framing,
//    plugins and form targets, the parts that don't need one.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
};

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const hasSession = request.cookies.getAll().some((cookie) => cookie.name.startsWith("sb-"));
  if (hasSession) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet, headers) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              response = NextResponse.next({ request });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
              // Supabase's no-store headers keep a CDN from caching a response
              // that carries a refreshed login cookie.
              Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
            },
          },
        }
      );
      await supabase.auth.getUser();
    } catch {
      // A failed refresh must never take the site down. The page still
      // renders, and the visitor just looks logged out.
    }
  }

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }
  return response;
}

// Skip static files: nothing there needs a session or these headers.
export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico).*)"],
};
