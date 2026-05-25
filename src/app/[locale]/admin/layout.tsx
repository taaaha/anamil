import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  LayoutDashboard,
  ShoppingBag,
  Archive,
  FileText,
  CalendarCheck,
  Mail,
  Users,
  LogOut,
} from "lucide-react";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { signOut } from "../login/actions";

const navItems = [
  { key: "dashboard", path: "", icon: LayoutDashboard },
  { key: "products", path: "products", icon: ShoppingBag },
  { key: "archive", path: "archive", icon: Archive },
  { key: "blog", path: "blog", icon: FileText },
  { key: "bookings", path: "bookings", icon: CalendarCheck },
  { key: "messages", path: "messages", icon: Mail },
  { key: "artisans", path: "artisans", icon: Users },
] as const;

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasSupabaseEnv()) {
    return (
      <div className="container-page py-16">
        <div className="surface-card p-8 max-w-xl mx-auto bg-rose-deep/5 border-rose-deep/20">
          <h1 className="text-xl font-semibold text-rose-deep mb-3">
            Supabase not configured
          </h1>
          <p className="text-sm text-ink-700 leading-relaxed">
            The admin dashboard requires a Supabase project. Configure your
            <code className="px-1 mx-1 rounded bg-sand-100 text-clay-700">.env.local</code>
            with <code className="px-1 rounded bg-sand-100 text-clay-700">NEXT_PUBLIC_SUPABASE_URL</code> and
            <code className="px-1 mx-1 rounded bg-sand-100 text-clay-700">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            then run <code className="px-1 rounded bg-sand-100 text-clay-700">supabase/schema.sql</code>.
            See <code className="px-1 rounded bg-sand-100 text-clay-700">DEPLOY.md</code> for full steps.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const t = await getTranslations("admin");

  return (
    <div className="container-page py-10 grid lg:grid-cols-[16rem_1fr] gap-8">
      <aside className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-400 mb-3 px-3">
          {t("title")}
        </p>
        {navItems.map(({ key, path, icon: Icon }) => (
          <Link
            key={key}
            href={`/${locale}/admin${path ? `/${path}` : ""}`}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
          >
            <Icon className="size-4 text-clay-500" />
            {t(key)}
          </Link>
        ))}
        <form
          action={async () => {
            "use server";
            await signOut(locale);
          }}
          className="pt-3 mt-3 border-t border-ink-100"
        >
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-deep hover:bg-rose-deep/5 transition-colors"
          >
            <LogOut className="size-4" />
            {(await getTranslations("auth"))("signOut")}
          </button>
        </form>
        <p className="text-xs text-ink-400 px-3 pt-4 break-all">{user.email}</p>
      </aside>
      <div>{children}</div>
    </div>
  );
}
