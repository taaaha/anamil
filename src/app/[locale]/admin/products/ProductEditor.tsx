"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Text, Area, Select, Toggle, LocalizedGroup } from "@/components/admin/Field";
import { Button } from "@/components/ui/Button";
import { saveProduct } from "../actions";
import type { Product } from "@/lib/supabase/types";

export function ProductEditor({ product }: { product?: Product }) {
  const t = useTranslations("admin");
  const tShop = useTranslations("shop");
  const locale = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await saveProduct(new FormData(e.currentTarget));
    setPending(false);
    if (res.ok) {
      router.push(`/${locale}/admin/products`);
      router.refresh();
    } else {
      setError(res.error ?? "Error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Text name="slug" label="Slug (URL)" defaultValue={product?.slug} required placeholder="melhfa-aurassienne" dir="ltr" />
        <Select
          name="category"
          label={tShop("filters")}
          defaultValue={product?.category}
          options={[
            { value: "heritage", label: tShop("categories.heritage") },
            { value: "modern", label: tShop("categories.modern") },
            { value: "accessories", label: tShop("categories.accessories") },
          ]}
        />
      </div>

      <LocalizedGroup base="title" label={tShop("title")} values={product?.title} />
      <LocalizedGroup base="short_description" label={tShop("subtitle")} values={product?.short_description} area />
      <LocalizedGroup base="story" label={tShop("story")} values={product?.story} area />
      <LocalizedGroup base="symbolism" label={tShop("symbolism")} values={product?.symbolism} area />
      <LocalizedGroup base="occasion" label={tShop("occasion")} values={product?.occasion} />

      <div className="grid sm:grid-cols-2 gap-4">
        <Text name="price_dzd" label={`${tShop("title")} (${tShop("currency")})`} type="number" defaultValue={product?.price_dzd} required dir="ltr" />
        <Text name="artisan_name" label={tShop("artisanCert")} defaultValue={product?.artisan_name} />
      </div>

      <Area name="sizes" label={`${tShop("sizes")} (${locale === "ar" ? "افصل بفاصلة" : "comma-separated"})`} defaultValue={product?.sizes?.join(", ")} rows={2} dir="ltr" />
      <Area name="images" label={`Images URLs (${locale === "ar" ? "رابط في كل سطر" : "one per line"})`} defaultValue={product?.images?.join("\n")} rows={3} dir="ltr" />

      <div className="flex flex-wrap items-center gap-6">
        <Toggle name="in_stock" label={tShop("addToCart")} defaultChecked={product ? product.in_stock : true} />
        <Toggle name="featured" label="Featured" defaultChecked={product?.featured ?? false} />
      </div>

      {error && <p className="text-sm text-rose-deep">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="primary" size="md" disabled={pending}>
          {pending ? "…" : t("save")}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => router.back()}>
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
