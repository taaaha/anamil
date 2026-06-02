import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ContactSubmission } from "@/lib/supabase/types";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateMessageStatus } from "../actions";

const STATUSES = ["new", "read", "archived"] as const;

export default async function AdminMessages({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data as ContactSubmission[]) ?? [];

  const statusOptions = STATUSES.map((s) => ({ value: s, label: s }));

  return (
    <>
      <h1 className="heading-3 mb-8">{t("messages")}</h1>
      <div className="space-y-4">
        {rows.map((m) => (
          <article
            key={m.id}
            className={`surface-card p-5 ${m.status === "new" ? "ring-1 ring-clay-300" : ""}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold text-ink-900">{m.name}</p>
                <p className="text-xs text-ink-400" dir="ltr">
                  {m.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-400 whitespace-nowrap">
                  {new Date(m.created_at).toLocaleDateString(locale)}
                </span>
                <StatusSelect id={m.id} value={m.status} options={statusOptions} action={updateMessageStatus} />
              </div>
            </div>
            {m.subject && <p className="text-sm font-medium text-clay-600 mb-2">{m.subject}</p>}
            <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">{m.message}</p>
          </article>
        ))}
        {rows.length === 0 && (
          <div className="surface-card p-12 text-center text-ink-400">{t("noData")}</div>
        )}
      </div>
    </>
  );
}
