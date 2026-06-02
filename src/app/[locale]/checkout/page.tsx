import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { CheckoutClient } from "./CheckoutClient";
import { getCurrentUser } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: t("title") };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");
  const user = await getCurrentUser();

  return (
    <Section className="bg-sand-50 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="heading-2">{t("title")}</h1>
        <p className="lead mt-2">{t("subtitle")}</p>
      </div>
      <CheckoutClient defaultEmail={user?.email ?? ""} />
    </Section>
  );
}
