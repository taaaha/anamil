import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { AuthForm } from "./AuthForm";
import { BerberBand } from "@/components/patterns/Berber";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";

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

  // Already signed in → skip the form.
  const user = await getCurrentUser();
  if (user) {
    redirect(isAdminEmail(user.email) ? `/${locale}/admin` : `/${locale}/account`);
  }

  const t = await getTranslations("auth");

  return (
    <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-ink-900 text-sand-50 p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]">
          <BerberBand className="w-full h-full text-sand-100" />
        </div>
        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-clay-300">
            أنامل الأوراس والزيبان
          </p>
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl xl:text-5xl leading-tight mb-4">
            {locale === "ar"
              ? "تراثٌ يُحفَظ، وكرامةٌ تُمكَّن"
              : locale === "fr"
                ? "Un patrimoine préservé, une dignité émancipée"
                : "Heritage preserved, dignity empowered"}
          </h2>
          <p className="text-sand-200/70 max-w-sm">
            {locale === "ar"
              ? "ادخل إلى حسابك لمتابعة طلباتك وحجوزاتك."
              : locale === "fr"
                ? "Connectez-vous pour suivre vos commandes et réservations."
                : "Sign in to follow your orders and bookings."}
          </p>
        </div>
        <div className="relative flex gap-2">
          <span className="size-2 rounded-full bg-heritage-green" />
          <span className="size-2 rounded-full bg-rose-deep" />
          <span className="size-2 rounded-full bg-heritage-gold" />
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-sand-50">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-ink-900 mb-1">{t("loginTitle")}</h1>
          <p className="text-ink-500 mb-8">{t("loginSubtitle")}</p>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
