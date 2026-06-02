// Central, defensive accessors for Supabase env vars.
// Normalizes the URL so a pasted "/rest/v1/" suffix or trailing slash
// can never produce the "Invalid path specified in request URL" auth error.

export function getSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return raw
    .trim()
    .replace(/\/rest\/v1\/?$/i, "") // strip REST suffix if pasted
    .replace(/\/auth\/v1\/?$/i, "") // strip auth suffix if pasted
    .replace(/\/+$/, ""); // strip trailing slashes
}

export function getSupabaseAnonKey(): string {
  return (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
}

export function getSupabaseServiceKey(): string {
  return (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
}

export function hasSupabaseEnv(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
