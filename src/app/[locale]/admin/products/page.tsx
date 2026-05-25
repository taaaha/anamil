import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { pickLocale, type Product } from "@/lib/supabase/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AdminProducts({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tShop = await getTranslations("shop");

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  const products = (data as Product[]) ?? [];

  return (
    <>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="heading-3">{t("products")}</h1>
        <p className="text-sm text-ink-400">
          {locale === "ar"
            ? "إدارة المنتجات تتم حاليًا عبر لوحة Supabase"
            : locale === "fr"
              ? "La gestion des produits se fait via le tableau Supabase"
              : "Manage products via the Supabase dashboard for now"}
        </p>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand-100 text-ink-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-start px-5 py-3">{t("products")}</th>
              <th className="text-start px-5 py-3">{tShop("sortBy")}</th>
              <th className="text-start px-5 py-3">{tShop("currency")}</th>
              <th className="text-start px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-ink-100">
                <td className="px-5 py-3 font-medium text-ink-900">
                  {pickLocale(p.title, locale)}
                </td>
                <td className="px-5 py-3 text-ink-500">{p.category}</td>
                <td className="px-5 py-3 text-clay-600 font-medium">
                  {p.price_dzd.toLocaleString(locale)}
                </td>
                <td className="px-5 py-3 text-end">
                  <Link
                    href={`/${locale}/shop/${p.slug}`}
                    className="inline-flex items-center gap-1 text-clay-600 hover:text-clay-700"
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-ink-400">
                  —
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
