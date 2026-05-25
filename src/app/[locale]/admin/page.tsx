import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ShoppingBag, FileText, CalendarCheck, Mail, Archive, Users } from "lucide-react";

async function countRows(table: string) {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const [products, archive, posts, bookings, messages, artisans] =
    await Promise.all([
      countRows("products"),
      countRows("archive_items"),
      countRows("blog_posts"),
      countRows("tourism_bookings"),
      countRows("contact_submissions"),
      countRows("artisans"),
    ]);

  const stats = [
    { label: t("products"), value: products, icon: ShoppingBag },
    { label: t("archive"), value: archive, icon: Archive },
    { label: t("blog"), value: posts, icon: FileText },
    { label: t("bookings"), value: bookings, icon: CalendarCheck },
    { label: t("messages"), value: messages, icon: Mail },
    { label: t("artisans"), value: artisans, icon: Users },
  ];

  return (
    <>
      <h1 className="heading-3 mb-8">{t("dashboard")}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-6">
            <div className="size-10 rounded-xl bg-clay-50 text-clay-600 flex items-center justify-center mb-4">
              <s.icon className="size-5" />
            </div>
            <p className="text-3xl font-semibold text-ink-900">{s.value}</p>
            <p className="text-sm text-ink-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
