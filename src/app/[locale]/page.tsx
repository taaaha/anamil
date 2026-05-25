import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Archive,
  ShoppingBag,
  BookOpen,
  Users,
  Camera,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { Logo } from "@/components/Logo";
import { Ornament } from "@/components/Ornament";
import { listProducts } from "@/lib/data";
import { heroImages, archiveImages, unsplash } from "@/lib/images";

const pillarIcons = {
  archive: Archive,
  shop: ShoppingBag,
  story: BookOpen,
  empowerment: Users,
  tourism: Camera,
} as const;

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
      {/* ─── Hero: editorial dark + cinematic photo ────────── */}
      <section className="relative isolate overflow-hidden bg-ink-900 text-sand-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unsplash(heroImages.primary, 2400)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/60 to-ink-900" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay-400/40 to-transparent" />

        <div className="container-page relative py-28 sm:py-36 lg:py-48">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium uppercase tracking-[0.32em] text-clay-300/90 mb-8">
              <span className="block w-8 h-px bg-clay-400/60" />
              <span className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-heritage-green" />
                <span className="size-1 rounded-full bg-rose-deep" />
                <span className="size-1 rounded-full bg-heritage-gold" />
              </span>
              <span>
                {locale === "ar"
                  ? "مشونش · بسكرة"
                  : locale === "fr"
                    ? "Mchounèche · Biskra"
                    : "Mchounèche · Biskra"}
              </span>
            </div>

            <h1
              className={
                "font-semibold tracking-tight text-sand-50 mb-7 leading-[1.05] " +
                "text-[2.6rem] sm:text-6xl lg:text-[5.5rem]"
              }
            >
              {t("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-sand-200/85 leading-relaxed max-w-2xl">
              {t("heroSubtitle")}
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
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
                  className="!border-sand-200/30 !text-sand-50 hover:!bg-sand-50/10"
                >
                  {t("ctaDiscover")}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* edge ornament + bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-sand-50" />
        <Ornament className="absolute bottom-4 start-1/2 -translate-x-1/2 text-clay-300/60 w-40 h-auto z-10" />
      </section>

      {/* ─── Pillars: clean white grid ──────────────────────── */}
      <Section className="bg-sand-50">
        <SectionHeader title={t("pillarsTitle")} align="center" />
        <div className="grid gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
          {(["archive", "shop", "story", "empowerment", "tourism"] as const).map(
            (key) => {
              const Icon = pillarIcons[key];
              return (
                <Link
                  key={key}
                  href={`/${locale}/${key === "shop" ? "shop" : key}`}
                  className="group bg-white p-7 sm:p-8 hover:bg-clay-50/40 transition-colors flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
                >
                  <div className="size-12 rounded-xl bg-clay-50 text-clay-600 group-hover:bg-clay-500 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-900 mb-1.5 text-lg">
                      {t(`pillars.${key}.title`)}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed">
                      {t(`pillars.${key}.desc`)}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-ink-300 group-hover:text-clay-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all hidden sm:block self-center rtl:rotate-180" />
                </Link>
              );
            }
          )}
        </div>
      </Section>

      {/* ─── Featured products ─────────────────────────────── */}
      <Section className="bg-white">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-clay-500 mb-3">
              {t("featuredTitle")}
            </p>
            <h2 className="heading-2">{t("featuredSubtitle")}</h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-clay-600 hover:text-clay-700 group"
          >
            {tCommon("viewAll")}
            <ArrowRight className="size-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* ─── Identity / authenticity seal ──────────────────── */}
      <section className="relative bg-sand-100 overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-50" />
        <div className="container-page relative py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-clay-200/60 via-sand-100 to-heritage-green-light/30 blur-2xl" />
                <div className="relative bg-sand-50 rounded-full p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(78,33,18,0.25)] border border-clay-200/40">
                  <Logo variant="seal" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-heritage-green-dark mb-4">
                <ShieldCheck className="size-4" />
                <span>
                  {locale === "ar"
                    ? "ختم الأصالة"
                    : locale === "fr"
                      ? "Sceau d'authenticité"
                      : "Seal of authenticity"}
                </span>
              </div>
              <h2 className="heading-2 mb-5">{t("missionTitle")}</h2>
              <p className="text-base sm:text-lg text-ink-500 leading-relaxed max-w-2xl mb-8">
                {t("missionBody")}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/about`}>
                  <Button variant="primary" size="md">
                    {tCommon("readMore")}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link href={`/${locale}/empowerment`}>
                  <Button variant="ghost" size="md">
                    {locale === "ar"
                      ? "تعرّف على الحرفيات"
                      : locale === "fr"
                        ? "Rencontrez les artisanes"
                        : "Meet the artisans"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Closing image-led section ─────────────────────── */}
      <section className="relative bg-ink-900 text-sand-50 overflow-hidden">
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:col-span-7 lg:min-h-[520px] order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplash(archiveImages.canyon, 1800)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-ink-900/20 to-ink-900" />
          </div>
          <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24 flex items-center lg:col-span-5 order-1 lg:order-2">
            <div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-clay-400 mb-3">
                {locale === "ar"
                  ? "الأوراس والزيبان"
                  : locale === "fr"
                    ? "Aurès et Zibane"
                    : "Aurès & Zibane"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-sand-50 mb-5 leading-tight">
                {t("heroTitle")}
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
