export type LocalizedText = {
  ar?: string | null;
  fr?: string | null;
  en?: string | null;
};

export type ProductCategory = "heritage" | "modern" | "accessories";

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  title: LocalizedText;
  short_description: LocalizedText;
  story: LocalizedText;
  symbolism: LocalizedText;
  occasion: LocalizedText;
  artisan_name: string | null;
  price_dzd: number;
  sizes: string[] | null;
  images: string[] | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export interface ArchiveItem {
  id: string;
  slug: string;
  kind: "photo" | "interview" | "timeline" | "symbol" | "map";
  title: LocalizedText;
  description: LocalizedText;
  year: number | null;
  media_url: string | null;
  created_at: string;
}

export interface Artisan {
  id: string;
  name: string;
  bio: LocalizedText;
  village: string | null;
  years_experience: number | null;
  photo_url: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  locale: "ar" | "fr" | "en";
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  reading_minutes: number;
  published_at: string;
  created_at: string;
}

export interface TourismBooking {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  experience: string;
  preferred_date: string;
  party_size: number;
  notes: string | null;
  status: "new" | "confirmed" | "cancelled";
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
}

export function pickLocale(
  text: LocalizedText | null | undefined,
  locale: string,
  fallback: string = "ar"
): string {
  if (!text) return "";
  const l = locale as keyof LocalizedText;
  return text[l] || text[fallback as keyof LocalizedText] || text.ar || text.fr || text.en || "";
}
