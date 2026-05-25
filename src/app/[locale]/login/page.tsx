import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { LoginForm } from "./LoginForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("loginTitle") };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <Section className="bg-sand-50">
      <div className="max-w-md mx-auto">
        <h1 className="heading-2 mb-3">{t("loginTitle")}</h1>
        <p className="text-ink-500 mb-8">{t("loginSubtitle")}</p>
        <LoginForm />
      </div>
    </Section>
  );
}
