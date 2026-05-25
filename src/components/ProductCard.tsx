import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/supabase/types";
import { pickLocale } from "@/lib/supabase/types";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/cn";

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-FR" : "en-US",
    { maximumFractionDigits: 0 }
  ).format(value);
}

function isUnsplashUrl(url: string) {
  return url.includes("images.unsplash.com");
}

const categoryGradient: Record<string, string> = {
  heritage: "from-rose-deep via-clay-500 to-sand-400",
  modern: "from-ink-700 via-clay-600 to-clay-400",
  accessories: "from-clay-500 via-sand-400 to-sand-200",
};

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTranslations("shop");
  const title = pickLocale(product.title, locale);
  const desc = pickLocale(product.short_description, locale);
  const cover = product.images?.[0];
  const src = cover && isUnsplashUrl(cover) ? unsplash(cover, 800, 1000) : cover;

  return (
    <Link
      href={`/${locale}/shop/${product.slug}`}
      className={cn(
        "group surface-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-ink-100">
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
              categoryGradient[product.category] ?? "from-clay-400 to-sand-300"
            )}
          >
            <span className="font-display text-5xl text-white/70 select-none">أ</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 start-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur text-clay-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles className="size-3" />
            {locale === "ar" ? "مميز" : locale === "fr" ? "Vedette" : "Featured"}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-clay-500 mb-1.5">
          {t(`categories.${product.category}`)}
        </p>
        <h3 className="font-semibold text-ink-900 leading-tight line-clamp-2">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-400 line-clamp-2">{desc}</p>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-lg font-semibold text-clay-600">
            {formatPrice(product.price_dzd, locale)}{" "}
            <span className="text-sm font-normal text-ink-400">{t("currency")}</span>
          </span>
          <span className="text-xs text-ink-300 group-hover:text-clay-500 transition-colors">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
