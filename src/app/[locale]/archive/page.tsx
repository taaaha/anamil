import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import {
  Clock,
  Palette,
  MapPinned,
  Mic,
  Image as ImageIcon,
} from "lucide-react";
import { listArchiveItems } from "@/lib/data";
import { pickLocale } from "@/lib/supabase/types";
import { archiveImages, heroImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "archive" });
  return { title: t("title") };
}

const kindIcons = {
  timeline: Clock,
  symbol: Palette,
  map: MapPinned,
  interview: Mic,
  photo: ImageIcon,
} as const;

const kindGradient: Record<string, string> = {
  timeline: "from-clay-500 to-rose-deep",
  symbol: "from-rose-deep to-clay-600",
  map: "from-ink-700 to-clay-600",
  interview: "from-sand-500 to-clay-500",
  photo: "from-clay-400 to-sand-400",
};

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("archive");
  const items = await listArchiveItems();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-900 text-sand-50 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unsplash(heroImages.portrait, 2000)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/80 to-ink-900" />
        <div className="container-page relative">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-300 mb-3">
            {locale === "ar" ? "أرشيف رقمي" : locale === "fr" ? "Archive numérique" : "Digital archive"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-sand-50 max-w-3xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-sand-200 text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <Section className="bg-sand-50">
        <SectionHeader
          title={t("sections.timeline")}
          subtitle={t("sections.symbols")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = kindIcons[item.kind] ?? ImageIcon;
            const title = pickLocale(item.title, locale);
            const desc = pickLocale(item.description, locale);
            return (
              <article
                key={item.id}
                className="group surface-card overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className={`aspect-[3/2] relative overflow-hidden bg-gradient-to-br ${kindGradient[item.kind] ?? "from-clay-400 to-sand-300"} flex items-center justify-center`}
                >
                  {item.media_url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.media_url.includes("images.unsplash.com") ? unsplash(item.media_url, 800, 600) : item.media_url}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
                      <Icon className="absolute top-3 end-3 size-5 text-white drop-shadow-md" />
                    </>
                  ) : (
                    <Icon className="size-12 text-white/80" />
                  )}
                  {item.year && (
                    <span className="absolute top-3 start-3 bg-white/95 text-ink-900 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {item.year}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-clay-500 mb-2">
                    {item.kind}
                  </p>
                  <h3 className="font-semibold text-ink-900 mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">
                    {desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border-2 border-dashed border-clay-300 bg-clay-50/40 p-10 text-center">
          <MapPinned className="size-8 mx-auto text-clay-500 mb-3" />
          <h3 className="text-lg font-semibold text-ink-900 mb-1">
            {t("sections.map")}
          </h3>
          <p className="text-sm text-ink-500 max-w-md mx-auto">
            {t("comingSoon")}
          </p>
        </div>
      </Section>
    </>
  );
}
