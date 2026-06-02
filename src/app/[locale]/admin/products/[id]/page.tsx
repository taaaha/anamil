import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pickLocale, type Product } from "@/lib/supabase/types";
import { ProductEditor } from "../ProductEditor";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const product = data as Product;

  return (
    <>
      <Link
        href={`/${locale}/admin/products`}
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-600 mb-6"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("products")}
      </Link>
      <h1 className="heading-3 mb-8">
        {t("edit")}: {pickLocale(product.title, locale)}
      </h1>
      <ProductEditor product={product} />
    </>
  );
}
