import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <Section className="bg-gradient-to-br from-sand-100 to-clay-50 pb-10">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-600 mb-3">
          {t("title")}
        </p>
        <h1 className="heading-1 max-w-3xl">{t("subtitle")}</h1>
      </Section>

      <Section className="bg-sand-50 !pt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <aside className="space-y-4">
            <div className="surface-card p-5">
              <MapPin className="size-5 text-clay-600 mb-2" />
              <p className="text-sm font-semibold text-ink-900 mb-1">
                {locale === "ar" ? "العنوان" : locale === "fr" ? "Adresse" : "Address"}
              </p>
              <p className="text-sm text-ink-500">{t("info.address")}</p>
            </div>
            <div className="surface-card p-5">
              <Mail className="size-5 text-clay-600 mb-2" />
              <p className="text-sm font-semibold text-ink-900 mb-1">Email</p>
              <a
                href={`mailto:${t("info.email")}`}
                className="text-sm text-clay-600 hover:underline"
              >
                {t("info.email")}
              </a>
            </div>
            <div className="surface-card p-5">
              <Phone className="size-5 text-clay-600 mb-2" />
              <p className="text-sm font-semibold text-ink-900 mb-1">
                {locale === "ar" ? "الهاتف" : locale === "fr" ? "Téléphone" : "Phone"}
              </p>
              <p className="text-sm text-ink-500">{t("info.phone")}</p>
            </div>
            <a
              href="https://wa.me/213000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card p-5 flex items-center gap-3 bg-gradient-to-br from-clay-500 to-rose-deep text-sand-50 hover:shadow-md transition-shadow"
            >
              <MessageCircle className="size-5" />
              <span className="font-semibold">{t("info.whatsapp")}</span>
            </a>
          </aside>
        </div>
      </Section>
    </>
  );
}
