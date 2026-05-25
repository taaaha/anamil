import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { BookingForm } from "./BookingForm";
import { Building2, Shirt, Sparkles, Camera } from "lucide-react";
import { archiveImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tourism" });
  return { title: t("title") };
}

const expIcons = {
  workshop: Building2,
  tryOn: Shirt,
  embroidery: Sparkles,
  photo: Camera,
} as const;

export default async function TourismPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tourism");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-900 text-sand-50 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unsplash(archiveImages.desert_rock, 2000)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/65 to-ink-900" />
        <div className="container-page relative">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-300 mb-3">
            {t("title")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-sand-50 max-w-3xl">
            {t("subtitle")}
          </h1>
        </div>
      </section>

      <Section className="bg-sand-50">
        <SectionHeader
          title={
            locale === "ar"
              ? "تجارب يمكنك حجزها"
              : locale === "fr"
                ? "Expériences à réserver"
                : "Experiences you can book"
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(["workshop", "tryOn", "embroidery", "photo"] as const).map((key) => {
            const Icon = expIcons[key];
            return (
              <div key={key} className="surface-card p-6">
                <div className="size-11 rounded-xl bg-clay-50 text-clay-600 flex items-center justify-center mb-4">
                  <Icon className="size-5" />
                </div>
                <p className="font-semibold text-ink-900">
                  {t(`experiences.${key}`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeader title={t("bookTitle")} />
        <BookingForm />
      </Section>
    </>
  );
}
