import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { TourismBooking } from "@/lib/supabase/types";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateBookingStatus } from "../actions";

const STATUSES = ["new", "confirmed", "cancelled"] as const;

export default async function AdminBookings({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tT = await getTranslations("tourism.experiences");
  const tStatus = await getTranslations("orders.status");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("tourism_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data as TourismBooking[]) ?? [];

  const statusOptions = STATUSES.map((s) => ({ value: s, label: tStatus(s) }));
  const expLabel = (e: string) => {
    try {
      return tT(e as never);
    } catch {
      return e;
    }
  };

  return (
    <>
      <h1 className="heading-3 mb-8">{t("bookings")}</h1>
      <div className="space-y-3">
        {rows.map((b) => (
          <div key={b.id} className="surface-card p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-ink-900">{b.full_name}</p>
              <p className="text-sm text-ink-400" dir="ltr">
                {b.email} · {b.phone}
              </p>
              <p className="text-sm text-ink-500 mt-1">
                {expLabel(b.experience)} ·{" "}
                {new Date(b.preferred_date).toLocaleDateString(locale)} · {b.party_size}
              </p>
              {b.notes && <p className="text-sm text-ink-400 italic mt-1">“{b.notes}”</p>}
            </div>
            <StatusSelect id={b.id} value={b.status} options={statusOptions} action={updateBookingStatus} />
          </div>
        ))}
        {rows.length === 0 && (
          <div className="surface-card p-12 text-center text-ink-400">{t("noData")}</div>
        )}
      </div>
    </>
  );
}
