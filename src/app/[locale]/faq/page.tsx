import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "./FAQAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title") };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <Section className="bg-sand-50">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-3">{t("title")}</p>
        <h1 className="heading-2 mb-3">{t("title")}</h1>
        <p className="lead mb-10">{t("subtitle")}</p>
        <FAQAccordion items={items} />
      </div>
    </Section>
  );
}
