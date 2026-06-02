import { createSupabaseServerClient, hasSupabaseEnv } from "./supabase/server";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Admin gating. Set ADMIN_EMAILS (comma-separated) in env to restrict /admin.
 * If ADMIN_EMAILS is empty, any authenticated user is treated as admin
 * (convenient for the single-user test phase). Lock it down before adding
 * public customer signups.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (list.length === 0) return true;
  return list.includes(email.toLowerCase());
}

/**
 * Guard for admin server actions. Throws if the caller isn't an admin.
 * Call at the top of every mutating admin action before touching the DB.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error("Unauthorized");
  }
  return user;
}
