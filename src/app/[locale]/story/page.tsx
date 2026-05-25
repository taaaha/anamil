import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { listProducts } from "@/lib/data";
import { pickLocale } from "@/lib/supabase/types";
import { unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "story" });
  return { title: t("title") };
}

const blockGradients = [
  "from-rose-deep via-clay-500 to-sand-400",
  "from-ink-700 via-clay-600 to-clay-400",
  "from-clay-500 via-sand-400 to-sand-200",
];

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("story");
  const products = await listProducts();

  return (
    <>
      <Section className="bg-gradient-to-br from-sand-100 via-sand-50 to-clay-50 pb-12">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-600 mb-3">
          {t("title")}
        </p>
        <h1 className="heading-1 max-w-3xl">{t("subtitle")}</h1>
      </Section>

      <Section className="bg-sand-50 !pt-12">
        <div className="space-y-16">
          {products.map((p, idx) => {
            const title = pickLocale(p.title, locale);
            const story = pickLocale(p.story, locale);
            const symbolism = pickLocale(p.symbolism, locale);
            const occasion = pickLocale(p.occasion, locale);
            const flip = idx % 2 === 1;
            return (
              <article
                key={p.id}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${flip ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <div className="lg:col-span-5">
                  <div
                    className={`aspect-[4/5] rounded-3xl overflow-hidden relative bg-gradient-to-br ${blockGradients[idx % blockGradients.length]} flex items-center justify-center shadow-sm`}
                  >
                    {p.images && p.images[0] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={p.images[0].includes("images.unsplash.com") ? unsplash(p.images[0], 900, 1125) : p.images[0]}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display text-7xl text-white/70">أ</span>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay-500 mb-3">
                    {String(idx + 1).padStart(2, "0")} · {p.category}
                  </p>
                  <h2 className="heading-2 mb-5">{title}</h2>

                  <div className="space-y-5 text-ink-700 leading-relaxed">
                    {story && (
                      <div>
                        <p className="text-sm font-semibold text-clay-600 mb-1">
                          {t("origin")}
                        </p>
                        <p>{story}</p>
                      </div>
                    )}
                    {symbolism && (
                      <div>
                        <p className="text-sm font-semibold text-clay-600 mb-1">
                          {t("color")}
                        </p>
                        <p>{symbolism}</p>
                      </div>
                    )}
                    {occasion && (
                      <div>
                        <p className="text-sm font-semibold text-clay-600 mb-1">
                          {t("occasion")}
                        </p>
                        <p>{occasion}</p>
                      </div>
                    )}
                    {p.artisan_name && (
                      <blockquote className="border-s-4 border-clay-400 ps-5 py-2 bg-clay-50/40 rounded-e-xl">
                        <Quote className="size-4 text-clay-500 mb-2" />
                        <p className="text-sm font-medium text-ink-900">
                          {p.artisan_name}
                        </p>
                        <p className="text-xs text-ink-500 mt-1">
                          {t("testimony")}
                        </p>
                      </blockquote>
                    )}
                  </div>

                  <Link
                    href={`/${locale}/shop/${p.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-clay-600 hover:text-clay-700"
                  >
                    {locale === "ar"
                      ? "اطلب هذه القطعة"
                      : locale === "fr"
                        ? "Commander cette pièce"
                        : "Order this piece"}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
