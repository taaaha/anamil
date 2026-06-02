"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { LocalizedText } from "@/lib/supabase/types";

export type ActionResult = { ok: boolean; error?: string };

function loc(fd: FormData, base: string): LocalizedText {
  return {
    ar: (fd.get(`${base}_ar`) as string) || "",
    fr: (fd.get(`${base}_fr`) as string) || "",
    en: (fd.get(`${base}_en`) as string) || "",
  };
}

function strArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ─────────────── PRODUCTS ─────────────── */

export async function saveProduct(fd: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();

  const id = (fd.get("id") as string) || null;
  const row = {
    slug: (fd.get("slug") as string)?.trim(),
    category: fd.get("category") as string,
    title: loc(fd, "title"),
    short_description: loc(fd, "short_description"),
    story: loc(fd, "story"),
    symbolism: loc(fd, "symbolism"),
    occasion: loc(fd, "occasion"),
    artisan_name: (fd.get("artisan_name") as string) || null,
    price_dzd: parseInt((fd.get("price_dzd") as string) || "0", 10) || 0,
    sizes: strArray(fd.get("sizes")),
    images: strArray(fd.get("images")),
    in_stock: fd.get("in_stock") === "on",
    featured: fd.get("featured") === "on",
  };

  if (!row.slug || !row.category) return { ok: false, error: "Slug and category required" };

  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

/* ─────────────── ARCHIVE ─────────────── */

export async function saveArchiveItem(fd: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const id = (fd.get("id") as string) || null;
  const row = {
    slug: (fd.get("slug") as string)?.trim(),
    kind: fd.get("kind") as string,
    title: loc(fd, "title"),
    description: loc(fd, "description"),
    year: fd.get("year") ? parseInt(fd.get("year") as string, 10) : null,
    media_url: (fd.get("media_url") as string) || null,
  };
  if (!row.slug || !row.kind) return { ok: false, error: "Slug and kind required" };

  const { error } = id
    ? await supabase.from("archive_items").update(row).eq("id", id)
    : await supabase.from("archive_items").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteArchiveItem(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("archive_items").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

/* ─────────────── ARTISANS ─────────────── */

export async function saveArtisan(fd: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const id = (fd.get("id") as string) || null;
  const row = {
    name: (fd.get("name") as string)?.trim(),
    bio: loc(fd, "bio"),
    village: (fd.get("village") as string) || null,
    years_experience: fd.get("years_experience")
      ? parseInt(fd.get("years_experience") as string, 10)
      : null,
    photo_url: (fd.get("photo_url") as string) || null,
  };
  if (!row.name) return { ok: false, error: "Name required" };

  const { error } = id
    ? await supabase.from("artisans").update(row).eq("id", id)
    : await supabase.from("artisans").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteArtisan(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("artisans").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

/* ─────────────── BLOG ─────────────── */

export async function saveBlogPost(fd: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const id = (fd.get("id") as string) || null;
  const row = {
    slug: (fd.get("slug") as string)?.trim(),
    locale: fd.get("locale") as string,
    title: (fd.get("title") as string)?.trim(),
    excerpt: (fd.get("excerpt") as string) || "",
    body: (fd.get("body") as string) || "",
    cover_image: (fd.get("cover_image") as string) || null,
    reading_minutes: parseInt((fd.get("reading_minutes") as string) || "5", 10) || 5,
  };
  if (!row.slug || !row.locale || !row.title)
    return { ok: false, error: "Slug, language and title required" };

  const { error } = id
    ? await supabase.from("blog_posts").update(row).eq("id", id)
    : await supabase.from("blog_posts").insert(row);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

/* ─────────────── STATUS UPDATES ─────────────── */

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateBookingStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("tourism_bookings")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateMessageStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}
