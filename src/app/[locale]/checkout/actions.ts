"use server";

import { z } from "zod";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

const itemSchema = z.object({
  product_id: z.string(),
  slug: z.string(),
  title: z.string(),
  price_dzd: z.number().int().nonnegative(),
  qty: z.number().int().min(1).max(99),
  size: z.string().nullable(),
});

const orderSchema = z.object({
  customer_name: z.string().min(2).max(120),
  customer_email: z.email(),
  customer_phone: z.string().min(5).max(40),
  shipping_address: z.string().min(3).max(400),
  city: z.string().min(2).max(120),
  notes: z.string().max(2000).optional().or(z.literal("")),
  items: z.array(itemSchema).min(1),
});

export type PlaceOrderInput = z.infer<typeof orderSchema>;
export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function placeOrder(
  input: PlaceOrderInput
): Promise<PlaceOrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "INVALID" };
  }

  const total = parsed.data.items.reduce(
    (s, it) => s + it.price_dzd * it.qty,
    0
  );

  if (!hasSupabaseEnv()) {
    // Dev fallback — pretend success so the flow is testable without a DB.
    return { ok: true, orderId: "TEST-" + Date.now().toString(36).toUpperCase() };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: parsed.data.customer_name,
      customer_email: parsed.data.customer_email,
      customer_phone: parsed.data.customer_phone,
      shipping_address: parsed.data.shipping_address,
      city: parsed.data.city,
      notes: parsed.data.notes || null,
      items: parsed.data.items,
      total_dzd: total,
    })
    .select("id")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, orderId: data.id as string };
}
