import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TourismBooking } from "@/lib/supabase/types";

export default async function AdminBookings({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tT = await getTranslations("tourism.experiences");

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("tourism_bookings")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data as TourismBooking[]) ?? [];

  const statusColor: Record<string, string> = {
    new: "bg-clay-100 text-clay-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-ink-100 text-ink-500",
  };

  return (
    <>
      <h1 className="heading-3 mb-8">{t("bookings")}</h1>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand-100 text-ink-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-start px-5 py-3">Date</th>
              <th className="text-start px-5 py-3">Name</th>
              <th className="text-start px-5 py-3">Experience</th>
              <th className="text-start px-5 py-3">Party</th>
              <th className="text-start px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-t border-ink-100">
                <td className="px-5 py-3 text-ink-700">
                  {new Date(b.preferred_date).toLocaleDateString(locale)}
                </td>
                <td className="px-5 py-3 text-ink-900">
                  <div className="font-medium">{b.full_name}</div>
                  <div className="text-xs text-ink-400">{b.email}</div>
                </td>
                <td className="px-5 py-3 text-ink-700">
                  {(() => {
                    try {
                      return tT(b.experience as never);
                    } catch {
                      return b.experience;
                    }
                  })()}
                </td>
                <td className="px-5 py-3 text-ink-700">{b.party_size}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${statusColor[b.status] ?? "bg-ink-100 text-ink-500"}`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink-400">
                  —
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
