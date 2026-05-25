"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginState = { status: "idle" | "error"; message?: string };

export async function signIn(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!hasSupabaseEnv()) {
    return {
      status: "error",
      message:
        "Supabase is not configured yet. Add your env keys to .env.local and run the SQL migration before signing in.",
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { status: "error", message: "Invalid input" };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { status: "error", message: error.message };

  const locale = (formData.get("locale") as string) || "ar";
  redirect(`/${locale}/admin`);
}

export async function signOut(locale: string) {
  if (!hasSupabaseEnv()) redirect(`/${locale}`);
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(`/${locale}`);
}
