import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heart, GraduationCap, Sparkles, MapPin } from "lucide-react";
import { listArtisans } from "@/lib/data";
import { pickLocale } from "@/lib/supabase/types";
import { archiveImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "empowerment" });
  return { title: t("title") };
}

export default async function EmpowermentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("empowerment");
  const artisans = await listArtisans();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-rose-deep-dark text-sand-50 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unsplash(archiveImages.woman_hillside, 2000)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-deep-dark/40 via-rose-deep-dark/75 to-rose-deep-dark" />
        <div className="container-page relative">
          <Heart className="size-7 text-sand-100 mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-sand-50 max-w-3xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-sand-200 text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <Section className="bg-sand-50">
        <SectionHeader title={t("artisansTitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artisans.map((a) => (
            <div key={a.id} className="surface-card p-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-clay-400 to-rose-deep flex items-center justify-center mb-4 text-white font-display text-2xl">
                {a.name.slice(0, 1)}
              </div>
              <h3 className="font-semibold text-ink-900 text-lg">{a.name}</h3>
              {a.village && (
                <p className="inline-flex items-center gap-1 text-sm text-ink-400 mt-1">
                  <MapPin className="size-3" />
                  {a.village}
                </p>
              )}
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                {pickLocale(a.bio, locale)}
              </p>
              {a.years_experience !== null && (
                <div className="mt-4 pt-4 border-t border-ink-100 text-xs text-ink-400">
                  {a.years_experience}{" "}
                  {locale === "ar"
                    ? "سنة خبرة"
                    : locale === "fr"
                      ? "ans d'expérience"
                      : "years experience"}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="surface-card p-8">
            <GraduationCap className="size-7 text-clay-600 mb-4" />
            <h2 className="heading-3 mb-3">{t("trainingTitle")}</h2>
            <p className="text-ink-500 leading-relaxed">
              {locale === "ar"
                ? "نقدم برامج تدريبية للحرفيات الجدد على تقنيات النسيج والتطريز التقليدية، إلى جانب التسويق الرقمي وإدارة المشاريع الصغيرة."
                : locale === "fr"
                  ? "Nous offrons des programmes de formation aux nouvelles artisanes sur les techniques traditionnelles de tissage et de broderie, ainsi que le marketing numérique et la gestion de micro-projets."
                  : "We offer training programs for new artisans on traditional weaving and embroidery techniques, alongside digital marketing and micro-business management."}
            </p>
          </div>
          <div className="surface-card p-8 bg-gradient-to-br from-clay-500 to-rose-deep text-sand-50 border-clay-600">
            <Sparkles className="size-7 text-sand-100 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              {t("donateTitle")}
            </h2>
            <p className="text-sand-100 leading-relaxed mb-6">
              {t("donateBody")}
            </p>
            <Button variant="secondary" size="md">
              {t("donateCta")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
