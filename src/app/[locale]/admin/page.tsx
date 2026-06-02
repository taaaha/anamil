import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  FileText,
  CalendarCheck,
  Mail,
  Archive,
  Users,
} from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

async function count(table: string, filter?: { col: string; val: string }) {
  const supabase = createSupabaseAdminClient();
  let q = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) q = q.eq(filter.col, filter.val);
  const { count } = await q;
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

  const [
    products,
    orders,
    newOrders,
    bookings,
    newBookings,
    messages,
    newMessages,
    posts,
    archive,
    artisans,
  ] = await Promise.all([
    count("products"),
    count("orders"),
    count("orders", { col: "status", val: "new" }),
    count("tourism_bookings"),
    count("tourism_bookings", { col: "status", val: "new" }),
    count("contact_submissions"),
    count("contact_submissions", { col: "status", val: "new" }),
    count("blog_posts"),
    count("archive_items"),
    count("artisans"),
  ]);

  const cards = [
    { label: t("orders"), value: orders, badge: newOrders, icon: Package, href: "orders" },
    { label: t("bookings"), value: bookings, badge: newBookings, icon: CalendarCheck, href: "bookings" },
    { label: t("messages"), value: messages, badge: newMessages, icon: Mail, href: "messages" },
    { label: t("products"), value: products, badge: 0, icon: ShoppingBag, href: "products" },
    { label: t("blog"), value: posts, badge: 0, icon: FileText, href: "blog" },
    { label: t("archive"), value: archive, badge: 0, icon: Archive, href: "archive" },
    { label: t("artisans"), value: artisans, badge: 0, icon: Users, href: "artisans" },
  ];

  return (
    <>
      <h1 className="heading-3 mb-8">{t("dashboard")}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={`/${locale}/admin/${c.href}`}
            className="surface-card p-6 hover:shadow-md transition-shadow relative"
          >
            {c.badge > 0 && (
              <span className="absolute top-4 end-4 inline-flex items-center gap-1 bg-rose-deep text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {c.badge} {t("newBadge")}
              </span>
            )}
            <div className="size-10 rounded-xl bg-clay-50 text-clay-600 flex items-center justify-center mb-4">
              <c.icon className="size-5" />
            </div>
            <p className="text-3xl font-semibold text-ink-900">{c.value}</p>
            <p className="text-sm text-ink-500 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
