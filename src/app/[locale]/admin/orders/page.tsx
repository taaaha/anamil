import { getTranslations, setRequestLocale } from "next-intl/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Order } from "@/lib/supabase/types";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateOrderStatus } from "../actions";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default async function AdminOrders({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tOrders = await getTranslations("orders");
  const tShop = await getTranslations("shop");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  const orders = (data as Order[]) ?? [];

  const statusOptions = STATUSES.map((s) => ({ value: s, label: tOrders(`status.${s}`) }));

  return (
    <>
      <h1 className="heading-3 mb-8">{t("orders")}</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <article key={o.id} className="surface-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-ink-900">
                  {o.customer_name}
                  <span className="ms-2 font-mono text-xs text-ink-400">
                    #{o.id.slice(0, 8).toUpperCase()}
                  </span>
                </p>
                <p className="text-sm text-ink-400" dir="ltr">
                  {o.customer_email} · {o.customer_phone}
                </p>
                <p className="text-sm text-ink-400">
                  {o.shipping_address}, {o.city} ·{" "}
                  {new Date(o.created_at).toLocaleDateString(locale)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-clay-600 whitespace-nowrap">
                  {o.total_dzd.toLocaleString(locale)} {tShop("currency")}
                </span>
                <StatusSelect
                  id={o.id}
                  value={o.status}
                  options={statusOptions}
                  action={updateOrderStatus}
                />
              </div>
            </div>
            <ul className="text-sm text-ink-600 border-t border-ink-100 pt-3 space-y-1">
              {o.items.map((it, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>
                    {it.title}
                    {it.size ? ` (${it.size})` : ""} × {it.qty}
                  </span>
                  <span className="text-ink-400">
                    {(it.price_dzd * it.qty).toLocaleString(locale)}
                  </span>
                </li>
              ))}
            </ul>
            {o.notes && <p className="text-sm text-ink-400 mt-2 italic">“{o.notes}”</p>}
          </article>
        ))}
        {orders.length === 0 && (
          <div className="surface-card p-12 text-center text-ink-400">{t("noData")}</div>
        )}
      </div>
    </>
  );
}
