import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/lib/supabase/types";

export default async function AdminMessages({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data as ContactSubmission[]) ?? [];

  return (
    <>
      <h1 className="heading-3 mb-8">{t("messages")}</h1>
      <div className="space-y-4">
        {rows.map((m) => (
          <article key={m.id} className="surface-card p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold text-ink-900">{m.name}</p>
                <p className="text-xs text-ink-400">{m.email}</p>
              </div>
              <span className="text-xs text-ink-400">
                {new Date(m.created_at).toLocaleString(locale)}
              </span>
            </div>
            {m.subject && (
              <p className="text-sm font-medium text-clay-600 mb-2">{m.subject}</p>
            )}
            <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">
              {m.message}
            </p>
          </article>
        ))}
        {rows.length === 0 && (
          <div className="surface-card p-10 text-center text-ink-400">—</div>
        )}
      </div>
    </>
  );
}
