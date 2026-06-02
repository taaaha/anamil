import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pickLocale, type Product } from "@/lib/supabase/types";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "../actions";

export default async function AdminProducts({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tShop = await getTranslations("shop");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  const products = (data as Product[]) ?? [];

  return (
    <>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="heading-3">{t("products")}</h1>
        <Link href={`/${locale}/admin/products/new`}>
          <Button variant="primary" size="sm">
            <Plus className="size-4" />
            {t("addNew")}
          </Button>
        </Link>
      </div>

      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand-100 text-ink-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-start px-5 py-3">{t("products")}</th>
              <th className="text-start px-5 py-3 hidden sm:table-cell">{tShop("filters")}</th>
              <th className="text-start px-5 py-3">{tShop("currency")}</th>
              <th className="text-end px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-ink-100">
                <td className="px-5 py-3 font-medium text-ink-900">
                  {pickLocale(p.title, locale)}
                  {p.featured && <span className="ms-2 text-xs text-clay-500">★</span>}
                  {!p.in_stock && (
                    <span className="ms-2 text-xs text-rose-deep">({tShop("outOfStock")})</span>
                  )}
                </td>
                <td className="px-5 py-3 text-ink-500 hidden sm:table-cell">{p.category}</td>
                <td className="px-5 py-3 text-clay-600 font-medium">
                  {p.price_dzd.toLocaleString(locale)}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/${locale}/shop/${p.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-ink-400 hover:bg-ink-100"
                      title="View"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <Link
                      href={`/${locale}/admin/products/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:bg-clay-50 px-2.5 py-1.5 rounded-lg"
                    >
                      <Pencil className="size-4" />
                      {t("edit")}
                    </Link>
                    <DeleteButton id={p.id} action={deleteProduct} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-400">
                  {t("addNew")} →
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
