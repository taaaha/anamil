"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { unsplash } from "@/lib/images";
import { placeOrder } from "./actions";

function fmt(n: number, locale: string) {
  return new Intl.NumberFormat(locale).format(n);
}

export function CheckoutClient({ defaultEmail }: { defaultEmail: string }) {
  const { lines, total, clear, keyOf } = useCart();
  const t = useTranslations("checkout");
  const tShop = useTranslations("shop");
  const locale = useLocale();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const res = await placeOrder({
      customer_name: String(fd.get("name") ?? ""),
      customer_email: String(fd.get("email") ?? ""),
      customer_phone: String(fd.get("phone") ?? ""),
      shipping_address: String(fd.get("address") ?? ""),
      city: String(fd.get("city") ?? ""),
      notes: String(fd.get("notes") ?? ""),
      items: lines.map((l) => ({
        product_id: l.productId,
        slug: l.slug,
        title: l.title,
        price_dzd: l.price_dzd,
        qty: l.qty,
        size: l.size,
      })),
    });
    setPending(false);
    if (res.ok) {
      setOrderId(res.orderId);
      clear();
    } else {
      setError(res.error === "INVALID" ? t("subtitle") : res.error);
    }
  }

  // Success screen
  if (orderId) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <CheckCircle2 className="size-16 text-heritage-green mx-auto mb-6" />
        <h1 className="heading-2 mb-3">{t("successTitle")}</h1>
        <p className="lead mb-2">{t("successBody")}</p>
        <p className="text-sm text-ink-400 mb-8">
          {t("orderNumber")}:{" "}
          <span className="font-mono text-ink-700">{orderId.slice(0, 8).toUpperCase()}</span>
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={`/${locale}/account`}>
            <Button variant="primary" size="md">
              {t("viewOrders")}
            </Button>
          </Link>
          <Link href={`/${locale}/shop`}>
            <Button variant="outline" size="md">
              {tShop("title")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart
  if (lines.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <ShoppingBag className="size-12 text-ink-200 mx-auto mb-4" />
        <p className="text-ink-500 mb-6">{t("emptyRedirect")}</p>
        <Link href={`/${locale}/shop`}>
          <Button variant="primary" size="md">
            {tShop("title")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
      {/* Form */}
      <form onSubmit={onSubmit} className="surface-card p-6 sm:p-8 order-2 lg:order-1">
        <h2 className="font-semibold text-ink-900 text-lg mb-5">{t("shippingInfo")}</h2>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name" label={t("name")} required />
            <Field name="phone" label={t("phone")} type="tel" required />
          </div>
          <Field name="email" label={t("email")} type="email" defaultValue={defaultEmail} required dir="ltr" />
          <Field name="address" label={t("address")} required />
          <Field name="city" label={t("city")} required />
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">{t("notes")}</span>
            <textarea
              name="notes"
              rows={3}
              className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 resize-y"
            />
          </label>
        </div>

        <div className="mt-5 flex items-start gap-2 text-sm text-ink-500 bg-heritage-green/5 border border-heritage-green/20 rounded-xl p-3">
          <ShieldCheck className="size-4 mt-0.5 text-heritage-green shrink-0" />
          <span>{t("noPayment")}</span>
        </div>

        {error && <p className="mt-4 text-sm text-rose-deep">{error}</p>}

        <Button type="submit" variant="primary" size="lg" disabled={pending} className="w-full mt-6">
          {pending ? "…" : t("placeOrder")}
        </Button>
      </form>

      {/* Summary */}
      <div className="surface-card p-6 sm:p-7 order-1 lg:order-2 lg:sticky lg:top-24">
        <h2 className="font-semibold text-ink-900 text-lg mb-5">{t("summary")}</h2>
        <ul className="space-y-4 mb-5">
          {lines.map((l) => {
            const img =
              l.image && l.image.includes("images.unsplash.com")
                ? unsplash(l.image, 160, 200)
                : l.image;
            return (
              <li key={keyOf(l)} className="flex gap-3">
                <div className="size-16 rounded-lg overflow-hidden bg-ink-100 shrink-0 relative">
                  {img ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={img} alt={l.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-xl text-clay-400">
                      أ
                    </div>
                  )}
                  <span className="absolute -top-1.5 -end-1.5 size-5 rounded-full bg-clay-600 text-white text-[0.65rem] font-semibold flex items-center justify-center">
                    {l.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink-900 line-clamp-1">{l.title}</p>
                  {l.size && <p className="text-xs text-ink-400">{tShop("sizes")}: {l.size}</p>}
                </div>
                <p className="text-sm font-semibold text-ink-700 whitespace-nowrap">
                  {fmt(l.price_dzd * l.qty, locale)}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-ink-100 pt-4 flex items-center justify-between">
          <span className="font-medium text-ink-700">{t("summary")}</span>
          <span className="text-xl font-semibold text-clay-600">
            {fmt(total, locale)} {tShop("currency")}
          </span>
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  dir?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        dir={dir}
        className="h-12 rounded-xl border border-ink-200 bg-white px-4 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-400"
      />
    </label>
  );
}
