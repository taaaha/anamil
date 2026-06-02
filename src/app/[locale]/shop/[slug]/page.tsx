import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, listProducts } from "@/lib/data";
import { pickLocale } from "@/lib/supabase/types";
import { unsplash } from "@/lib/images";
import { AddToCart } from "@/components/cart/AddToCart";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: pickLocale(product.title, locale) };
}

const categoryGradient: Record<string, string> = {
  heritage: "from-rose-deep via-clay-500 to-sand-400",
  modern: "from-ink-700 via-clay-600 to-clay-400",
  accessories: "from-clay-500 via-sand-400 to-sand-200",
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tCommon = await getTranslations("common");
  const tStory = await getTranslations("story");

  const title = pickLocale(product.title, locale);
  const desc = pickLocale(product.short_description, locale);
  const story = pickLocale(product.story, locale);
  const symbolism = pickLocale(product.symbolism, locale);
  const occasion = pickLocale(product.occasion, locale);

  const related = (await listProducts())
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const priceFmt = new Intl.NumberFormat(
    locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-FR" : "en-US",
    { maximumFractionDigits: 0 }
  ).format(product.price_dzd);

  return (
    <>
      <Section className="bg-sand-50 !py-10">
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-clay-600 mb-8"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {tCommon("back")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br ${categoryGradient[product.category]}`}>
            {product.images && product.images.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0].includes("images.unsplash.com") ? unsplash(product.images[0], 1200, 1500) : product.images[0]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/70 font-display text-9xl select-none">
                أ
              </div>
            )}
            {product.featured && (
              <span className="absolute top-4 start-4 inline-flex items-center gap-1.5 bg-white/95 text-clay-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Sparkles className="size-3" />
                {locale === "ar" ? "مميز" : locale === "fr" ? "Pièce vedette" : "Featured"}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay-500 mb-3">
              {t(`categories.${product.category}`)}
            </p>
            <h1 className="heading-2 mb-4">{title}</h1>
            <p className="lead mb-8">{desc}</p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-semibold text-clay-600">{priceFmt}</span>
              <span className="text-lg text-ink-400">{t("currency")}</span>
            </div>

            <div className="mb-8 space-y-4">
              <AddToCart
                product={{
                  productId: product.id,
                  slug: product.slug,
                  title,
                  price_dzd: product.price_dzd,
                  image: product.images?.[0] ?? null,
                }}
                sizes={product.sizes}
                disabled={!product.in_stock}
              />
              <a
                href="https://wa.me/213000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="md">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            <div className="space-y-6 border-t border-ink-100 pt-8">
              {story && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-500 mb-2">
                    {tStory("origin")}
                  </h3>
                  <p className="text-ink-700 leading-relaxed">{story}</p>
                </div>
              )}
              {symbolism && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-500 mb-2">
                    {tStory("color")}
                  </h3>
                  <p className="text-ink-700 leading-relaxed">{symbolism}</p>
                </div>
              )}
              {occasion && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-clay-500 mb-2">
                    {tStory("occasion")}
                  </h3>
                  <p className="text-ink-700 leading-relaxed">{occasion}</p>
                </div>
              )}
              {product.artisan_name && (
                <div className="surface-card p-5 bg-clay-50/40 border-clay-200">
                  <p className="text-xs font-medium uppercase tracking-wider text-clay-600 mb-1">
                    {tStory("testimony")}
                  </p>
                  <p className="font-semibold text-ink-900">{product.artisan_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-white">
          <h2 className="heading-3 mb-8">
            {locale === "ar"
              ? "قطع أخرى قد تعجبك"
              : locale === "fr"
                ? "D'autres pièces susceptibles de vous plaire"
                : "You may also like"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/shop/${p.slug}`}
                className="surface-card overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className={`aspect-[4/5] relative overflow-hidden bg-gradient-to-br ${categoryGradient[p.category]} flex items-center justify-center`}
                >
                  {p.images && p.images[0] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.images[0].includes("images.unsplash.com") ? unsplash(p.images[0], 600, 750) : p.images[0]}
                      alt={pickLocale(p.title, locale)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-5xl text-white/70">أ</span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-ink-900 line-clamp-1">
                    {pickLocale(p.title, locale)}
                  </h4>
                  <p className="text-sm text-clay-600 mt-1">
                    {new Intl.NumberFormat(locale).format(p.price_dzd)} {t("currency")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
