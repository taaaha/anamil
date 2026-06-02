import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
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

const isUnsplash = (url: string) => url.includes("images.unsplash.com");

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
  const src = cover && isUnsplash(cover) ? unsplash(cover, 800, 1000) : cover;

  return (
    <Link
      href={`/${locale}/shop/${product.slug}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100">
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          </>
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
              categoryGradient[product.category] ?? "from-clay-400 to-sand-300"
            )}
          >
            <span className="font-display text-5xl text-white/70">أ</span>
          </div>
        )}

        {/* category tag */}
        <span className="absolute top-3 start-3 text-[0.7rem] font-medium uppercase tracking-wider text-sand-50/90 bg-ink-900/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {t(`categories.${product.category}`)}
        </span>

        {/* price chip on image */}
        <div className="absolute bottom-3 start-3 end-3 flex items-end justify-between gap-2">
          <span className="text-sand-50 font-semibold text-lg drop-shadow">
            {formatPrice(product.price_dzd, locale)}
            <span className="text-xs font-normal opacity-80"> {t("currency")}</span>
          </span>
          <span className="size-9 rounded-full bg-sand-50 text-clay-700 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
            <span className="rtl:rotate-180">→</span>
          </span>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-semibold text-ink-900 leading-snug group-hover:text-clay-700 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-400 line-clamp-2">{desc}</p>
      </div>
    </Link>
  );
}
