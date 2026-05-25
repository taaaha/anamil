"use server";

import { z } from "zod";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const bookingSchema = z.object({
  full_name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  experience: z.string().min(1),
  preferred_date: z.string().min(1),
  party_size: z.coerce.number().int().min(1).max(50),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export type BookingState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const parsed = bookingSchema.safeParse({
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    experience: formData.get("experience"),
    preferred_date: formData.get("preferred_date"),
    party_size: formData.get("party_size"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Invalid input" };
  }

  if (!hasSupabaseEnv()) {
    // dev-mode: pretend it worked so the form is testable without DB
    return { status: "success" };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("tourism_bookings").insert({
    full_name: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    experience: parsed.data.experience,
    preferred_date: parsed.data.preferred_date,
    party_size: parsed.data.party_size,
    notes: parsed.data.notes || null,
  });

  if (error) return { status: "error", message: error.message };
  return { status: "success" };
}
