import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceKey } from "./env";

/**
 * Service-role client — bypasses RLS. SERVER ONLY.
 * Use exclusively inside server actions/pages that have ALREADY verified
 * the caller is an admin (isAdminEmail). Never expose to the browser.
 */
export function createSupabaseAdminClient() {
  // Placeholder fallbacks prevent "supabaseUrl is required" from throwing at
  // construction when env is absent (local dev without keys). When env is
  // missing the admin layout already shows a "not configured" notice, so these
  // never run against a real project. On Vercel the real env is always present.
  const url = getSupabaseUrl() || "https://placeholder.supabase.co";
  const key = getSupabaseServiceKey() || "placeholder-key";
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function hasServiceKey() {
  return Boolean(getSupabaseServiceKey());
}
