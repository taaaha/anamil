import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { CheckCircle2, Target, Heart, Users2 } from "lucide-react";
import { productImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const scientific = t.raw("goalsScientificItems") as string[];
  const cultural = t.raw("goalsCulturalItems") as string[];
  const audience = t.raw("audienceItems") as string[];

  return (
    <>
      <Section className="bg-gradient-to-br from-sand-100 via-sand-50 to-clay-50 pb-16">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-clay-600 mb-3">
              {t("title")}
            </p>
            <h1 className="heading-1">{t("visionTitle")}</h1>
            <p className="lead mt-6 text-lg">{t("intro")}</p>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplash(productImages.embroidery_threadwork, 900, 1125)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/30 to-transparent" />
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="surface-card p-8 bg-clay-50/40 border-clay-200">
            <Target className="size-6 text-clay-600 mb-4" />
            <h2 className="heading-3 mb-4">{t("visionTitle")}</h2>
            <p className="text-ink-500 leading-relaxed">{t("visionBody")}</p>
          </div>
          <div className="surface-card p-8 bg-ink-900 text-sand-50 border-ink-700">
            <Heart className="size-6 text-clay-400 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              {t("audienceTitle")}
            </h2>
            <ul className="space-y-2.5">
              {audience.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sand-200 text-sm sm:text-base"
                >
                  <Users2 className="size-4 mt-1 text-clay-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-sand-50">
        <h2 className="heading-2 mb-12 text-center">{t("goalsTitle")}</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay-500 mb-2">
              01
            </p>
            <h3 className="heading-3 mb-5">{t("goalsScientific")}</h3>
            <ul className="space-y-3">
              {scientific.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 mt-0.5 text-clay-500 shrink-0" />
                  <span className="text-ink-700">{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay-500 mb-2">
              02
            </p>
            <h3 className="heading-3 mb-5">{t("goalsCultural")}</h3>
            <ul className="space-y-3">
              {cultural.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 mt-0.5 text-clay-500 shrink-0" />
                  <span className="text-ink-700">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
