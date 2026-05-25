"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";
import type { Product, ProductCategory } from "@/lib/supabase/types";

type CatFilter = ProductCategory | "all";
type Sort = "newest" | "priceAsc" | "priceDesc";

const categories: CatFilter[] = ["all", "heritage", "modern", "accessories"];

export function ShopGrid({ products }: { products: Product[] }) {
  const t = useTranslations("shop");
  const [cat, setCat] = useState<CatFilter>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    let list = cat === "all" ? products : products.filter((p) => p.category === cat);
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price_dzd - b.price_dzd);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price_dzd - a.price_dzd);
    return list;
  }, [products, cat, sort]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-medium border transition-colors",
                c === cat
                  ? "bg-ink-900 text-sand-50 border-ink-900"
                  : "bg-white text-ink-700 border-ink-200 hover:border-clay-400 hover:text-clay-600"
              )}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-ink-500">
          <span>{t("sortBy")}:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-lg border border-ink-200 bg-white px-3 text-ink-700 text-sm focus:outline-none focus:ring-2 focus:ring-clay-400"
          >
            <option value="newest">{t("newest")}</option>
            <option value="priceAsc">{t("priceLowHigh")}</option>
            <option value="priceDesc">{t("priceHighLow")}</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="surface-card p-12 text-center text-ink-400">—</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
