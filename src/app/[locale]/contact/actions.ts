"use server";

import { z } from "zod";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(5).max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) return { status: "error", message: "Invalid input" };

  if (!hasSupabaseEnv()) return { status: "success" };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
  });

  if (error) return { status: "error", message: error.message };
  return { status: "success" };
}
