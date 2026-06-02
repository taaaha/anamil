import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, CalendarCheck, LogOut, User } from "lucide-react";
import { getCurrentUser, isAdminEmail } from "@/lib/auth";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { signOut } from "../login/actions";
import type { TourismBooking } from "@/lib/supabase/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("accountTitle") };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const t = await getTranslations("auth");
  const admin = isAdminEmail(user.email);

  // Pull this user's bookings (matched by email).
  let bookings: TourismBooking[] = [];
  if (hasSupabaseEnv() && user.email) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("tourism_bookings")
      .select("*")
      .eq("email", user.email)
      .order("created_at", { ascending: false });
    bookings = (data as TourismBooking[]) ?? [];
  }

  return (
    <Section className="bg-sand-50 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-clay-500 to-rose-deep flex items-center justify-center text-white">
              <User className="size-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-ink-900">{t("accountTitle")}</h1>
              <p className="text-sm text-ink-500" dir="ltr">
                {user.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut(locale);
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="size-4" />
              {t("signOut")}
            </Button>
          </form>
        </div>

        {admin && (
          <Link
            href={`/${locale}/admin`}
            className="surface-card p-6 flex items-center gap-4 mb-8 hover:shadow-md transition-shadow bg-ink-900 text-sand-50 border-ink-700"
          >
            <LayoutDashboard className="size-6 text-clay-400" />
            <div className="flex-1">
              <p className="font-semibold">{t("adminPanel")}</p>
              <p className="text-sm text-sand-300">
                {locale === "ar"
                  ? "إدارة المنتجات والمحتوى والطلبات"
                  : locale === "fr"
                    ? "Gérer produits, contenu et commandes"
                    : "Manage products, content and orders"}
              </p>
            </div>
          </Link>
        )}

        <h2 className="text-sm font-semibold uppercase tracking-wider text-clay-600 mb-4 flex items-center gap-2">
          <CalendarCheck className="size-4" />
          {t("myBookings")}
        </h2>
        {bookings.length === 0 ? (
          <div className="surface-card p-8 text-center text-ink-400">
            {locale === "ar"
              ? "لا توجد حجوزات بعد"
              : locale === "fr"
                ? "Aucune réservation pour le moment"
                : "No bookings yet"}
          </div>
        ) : (
          <ul className="space-y-3">
            {bookings.map((b) => (
              <li key={b.id} className="surface-card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-ink-900">{b.experience}</p>
                  <p className="text-sm text-ink-400">
                    {new Date(b.preferred_date).toLocaleDateString(locale)} · {b.party_size}
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-clay-50 text-clay-700">
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
