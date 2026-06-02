import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Archive,
  ShoppingBag,
  BookOpen,
  Users,
  Camera,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import {
  Yaz,
  BerberBand,
  BerberField,
  BerberRule,
} from "@/components/patterns/Berber";
import { listProducts } from "@/lib/data";
import { heroImages, archiveImages, productImages, unsplash } from "@/lib/images";

const pillars = [
  { key: "archive", icon: Archive, href: "archive" },
  { key: "shop", icon: ShoppingBag, href: "shop" },
  { key: "story", icon: BookOpen, href: "story" },
  { key: "empowerment", icon: Users, href: "empowerment" },
  { key: "tourism", icon: Camera, href: "tourism" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const featured = await listProducts({ featuredOnly: true });

  return (
    <>
      {/* ═══ HERO — asymmetric editorial split ═══════════════ */}
      <section className="relative bg-ink-900 text-sand-50 overflow-hidden">
        <div className="grid lg:grid-cols-12">
          {/* Left: type */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10 px-5 sm:px-8 lg:ps-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pe-12 py-16 sm:py-24 lg:py-32 flex flex-col justify-center">
            <div className="eyebrow !text-clay-300 mb-7">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-heritage-green" />
                <span className="size-1.5 rounded-full bg-rose-deep" />
                <span className="size-1.5 rounded-full bg-heritage-gold" />
              </span>
              {locale === "ar" ? "مشونش · بسكرة" : "Mchounèche · Biskra"}
            </div>

            <h1 className="display text-[2.75rem] sm:text-6xl lg:text-[4.75rem] leading-[1.02] font-bold text-sand-50 mb-7">
              {t("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-200/80 leading-relaxed max-w-md mb-10">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/shop`}>
                <Button size="lg" variant="primary">
                  <ShoppingBag className="size-4" />
                  {t("ctaShop")}
                </Button>
              </Link>
              <Link href={`/${locale}/archive`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="!border-sand-200/25 !text-sand-50 hover:!bg-sand-50/10"
                >
                  {t("ctaDiscover")}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>

            <BerberBand className="mt-12 h-6 w-48 text-clay-400/50" />
          </div>

          {/* Right: image */}
          <div className="lg:col-span-6 xl:col-span-7 relative min-h-[320px] sm:min-h-[440px] lg:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplash(heroImages.primary, 1800)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r rtl:lg:bg-gradient-to-l from-ink-900 via-ink-900/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══ CURATED INDEX — numbered pillar list ════════════ */}
      <section className="bg-sand-50 texture-weave">
        <div className="container-page py-16 sm:py-24">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <Yaz className="size-8 text-clay-500 shrink-0" />
              <h2 className="heading-2">{t("pillarsTitle")}</h2>
            </div>
            <BerberRule className="hidden sm:block w-40 h-4 text-clay-300 mb-2" />
          </div>

          <div className="border-t border-ink-200">
            {pillars.map(({ key, icon: Icon, href }, i) => (
              <Link
                key={key}
                href={`/${locale}/${href}`}
                className="group flex items-center gap-5 sm:gap-8 py-6 sm:py-7 border-b border-ink-200 hover:bg-white transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <span className="display text-2xl sm:text-3xl text-ink-300 group-hover:text-clay-500 transition-colors tabular-nums w-10 sm:w-14 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="size-11 sm:size-12 rounded-xl bg-white border border-ink-100 group-hover:bg-clay-500 group-hover:border-clay-500 group-hover:text-white text-clay-600 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink-900 text-lg sm:text-xl">
                    {t(`pillars.${key}.title`)}
                  </h3>
                  <p className="text-sm text-ink-500 truncate">
                    {t(`pillars.${key}.desc`)}
                  </p>
                </div>
                <ArrowRight className="size-5 text-ink-300 group-hover:text-clay-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — editorial product showcase ═══════════ */}
      <section className="bg-white">
        <div className="container-page py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow mb-3">{t("featuredTitle")}</p>
              <h2 className="heading-2 max-w-xl">{t("featuredSubtitle")}</h2>
            </div>
            <Link
              href={`/${locale}/shop`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-clay-600 hover:text-clay-700 shrink-0"
            >
              {tCommon("viewAll")}
              <ArrowRight className="size-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IDENTITY — seal + Yaz + Berber field ════════════ */}
      <section className="relative bg-clay-700 text-sand-50 overflow-hidden">
        <BerberField className="absolute inset-0 w-full h-full text-sand-100/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-deep-dark/30 via-transparent to-clay-700" />
        <div className="container-page relative py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 mb-6">
                <Yaz className="size-7 text-sand-100" />
                <span className="eyebrow !text-sand-200">
                  {locale === "ar"
                    ? "ختم الأصالة"
                    : locale === "fr"
                      ? "Sceau d'authenticité"
                      : "Seal of authenticity"}
                </span>
              </div>
              <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {t("missionTitle")}
              </h2>
              <p className="text-base sm:text-lg text-sand-100/85 leading-relaxed max-w-2xl mb-8">
                {t("missionBody")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" size="md">
                    {tCommon("readMore")}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link href={`/${locale}/empowerment`}>
                  <Button
                    variant="outline"
                    size="md"
                    className="!border-sand-200/30 !text-sand-50 hover:!bg-sand-50/10"
                  >
                    {locale === "ar"
                      ? "تعرّف على الحرفيات"
                      : locale === "fr"
                        ? "Les artisanes"
                        : "Meet the artisans"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-5 rounded-[2rem] bg-sand-50/10 backdrop-blur-sm" />
                <div className="relative aspect-[4/5] w-64 sm:w-72 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-sand-50/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(productImages.silver_pendant_malachite, 700, 875)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING — landscape + invitation ════════════════ */}
      <section className="relative bg-ink-900 text-sand-50 overflow-hidden">
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:col-span-7 lg:min-h-[480px] order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplash(archiveImages.canyon, 1800)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r rtl:lg:bg-gradient-to-l from-ink-900 via-ink-900/20 to-transparent" />
          </div>
          <div className="px-5 sm:px-10 lg:px-16 py-16 lg:py-24 flex items-center lg:col-span-5 order-1 lg:order-2">
            <div>
              <p className="eyebrow !text-clay-400 mb-3">
                {locale === "ar"
                  ? "الأوراس والزيبان"
                  : locale === "fr"
                    ? "Aurès & Zibane"
                    : "Aurès & Zibane"}
              </p>
              <h2 className="display text-3xl sm:text-4xl font-bold leading-tight mb-5">
                {t("ctaDiscover")}
              </h2>
              <p className="text-sand-200/80 leading-relaxed mb-8">
                {t("missionBody")}
              </p>
              <Link href={`/${locale}/archive`}>
                <Button variant="primary" size="md">
                  {t("ctaDiscover")}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
