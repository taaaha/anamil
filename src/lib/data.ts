import { hasSupabaseEnv, createSupabaseServerClient } from "./supabase/server";
import type {
  Product,
  ArchiveItem,
  Artisan,
  BlogPost,
} from "./supabase/types";
import {
  fallbackProducts,
  fallbackArchive,
  fallbackArtisans,
  fallbackPosts,
} from "./fallback-data";

export async function listProducts({
  category,
  featuredOnly,
}: {
  category?: string;
  featuredOnly?: boolean;
} = {}): Promise<Product[]> {
  if (!hasSupabaseEnv()) {
    let list = fallbackProducts;
    if (category && category !== "all")
      list = list.filter((p) => p.category === category);
    if (featuredOnly) list = list.filter((p) => p.featured);
    return list;
  }
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (category && category !== "all") query = query.eq("category", category);
  if (featuredOnly) query = query.eq("featured", true);
  const { data, error } = await query;
  if (error) return [];
  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabaseEnv()) {
    return fallbackProducts.find((p) => p.slug === slug) ?? null;
  }
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return (data as Product) ?? null;
}

export async function listArchiveItems(): Promise<ArchiveItem[]> {
  if (!hasSupabaseEnv()) return fallbackArchive;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("archive_items")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as ArchiveItem[]) ?? [];
}

export async function listArtisans(): Promise<Artisan[]> {
  if (!hasSupabaseEnv()) return fallbackArtisans;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("artisans")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Artisan[]) ?? [];
}

export async function listPosts(locale: string): Promise<BlogPost[]> {
  if (!hasSupabaseEnv()) {
    return fallbackPosts.filter((p) => p.locale === locale);
  }
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("locale", locale)
    .order("published_at", { ascending: false });
  return (data as BlogPost[]) ?? [];
}

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  if (!hasSupabaseEnv()) {
    return (
      fallbackPosts.find((p) => p.slug === slug && p.locale === locale) ?? null
    );
  }
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .maybeSingle();
  return (data as BlogPost) ?? null;
}
