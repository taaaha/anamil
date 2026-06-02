import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/supabase/types";
import { pickLocale } from "@/lib/supabase/types";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/cn";

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-FR" : "en-US",
    { maximumFractionDigits: 0 }
  ).format(value);
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

  return (
    <Link href={`/${locale}/shop/${product.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <SmartImage
          src={product.images?.[0]}
          alt={title}
          width={800}
          height={1000}
          className="absolute inset-0 w-full h-full"
          imgClassName="group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          fallbackClassName={categoryGradient[product.category] ?? "from-clay-400 to-sand-300"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-transparent pointer-events-none" />

        <span className="absolute top-3 start-3 text-[0.7rem] font-medium uppercase tracking-wider text-sand-50/95 bg-ink-900/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {t(`categories.${product.category}`)}
        </span>
        {!product.in_stock && (
          <span className="absolute top-3 end-3 text-[0.7rem] font-semibold text-white bg-rose-deep/90 px-2.5 py-1 rounded-full">
            {t("outOfStock")}
          </span>
        )}

        <div className="absolute bottom-3 start-3 end-3 flex items-end justify-between gap-2">
          <span className="text-sand-50 font-semibold text-lg drop-shadow-md">
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
