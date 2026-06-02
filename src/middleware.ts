import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";
import { getSupabaseUrl, getSupabaseAnonKey, hasSupabaseEnv } from "./lib/supabase/env";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1) Locale routing first — produces the response we'll attach cookies to.
  const response = intlMiddleware(request);

  // 2) Refresh the Supabase auth session (if configured) so admin stays logged in.
  if (hasSupabaseEnv()) {
    const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });
    // Touch the session to trigger token refresh + cookie rotation.
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
