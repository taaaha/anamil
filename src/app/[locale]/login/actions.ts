"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";

const credsSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type AuthState = {
  status: "idle" | "error" | "success";
  message?: string;
  mode?: "login" | "signup";
};

const notConfigured =
  "قاعدة البيانات غير مهيأة بعد · La base de données n'est pas configurée · Database not configured yet.";

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  if (!hasSupabaseEnv())
    return { status: "error", mode: "login", message: notConfigured };

  const parsed = credsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success)
    return { status: "error", mode: "login", message: "Invalid email or password format" };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error)
    return { status: "error", mode: "login", message: error.message };

  const locale = (formData.get("locale") as string) || "ar";
  redirect(isAdminEmail(parsed.data.email) ? `/${locale}/admin` : `/${locale}/account`);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  if (!hasSupabaseEnv())
    return { status: "error", mode: "signup", message: notConfigured };

  const parsed = credsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success)
    return {
      status: "error",
      mode: "signup",
      message: "Password must be at least 6 characters and email valid",
    };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp(parsed.data);
  if (error)
    return { status: "error", mode: "signup", message: error.message };

  // If email confirmation is OFF, a session is returned → log straight in.
  if (data.session) {
    const locale = (formData.get("locale") as string) || "ar";
    redirect(`/${locale}/account`);
  }

  return {
    status: "success",
    mode: "signup",
    message:
      "تحقق من بريدك لتأكيد الحساب · Vérifiez votre e-mail · Check your email to confirm your account.",
  };
}

export async function signOut(locale: string) {
  if (!hasSupabaseEnv()) redirect(`/${locale}`);
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(`/${locale}`);
}
