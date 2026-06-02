"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "./CartProvider";
import { Button } from "../ui/Button";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/cn";

function fmt(n: number, locale: string) {
  return new Intl.NumberFormat(locale).format(n);
}

export function CartDrawer() {
  const { lines, total, count, open, setOpen, remove, setQty, keyOf } = useCart();
  const t = useTranslations("cart");
  const tShop = useTranslations("shop");
  const locale = useLocale();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity duration-300",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "absolute inset-y-0 end-0 w-full max-w-md bg-sand-50 shadow-2xl flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
        )}
        role="dialog"
        aria-label={t("title")}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-ink-100">
          <h2 className="font-semibold text-ink-900 inline-flex items-center gap-2">
            <ShoppingBag className="size-5 text-clay-600" />
            {t("title")}
            {count > 0 && (
              <span className="text-sm text-ink-400">
                ({count} {t("items")})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 -me-2 rounded-xl hover:bg-ink-100"
            aria-label="close"
          >
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="size-12 text-ink-200" />
            <p className="text-ink-500">{t("empty")}</p>
            <Link href={`/${locale}/shop`} onClick={() => setOpen(false)}>
              <Button variant="outline" size="md">
                {t("emptyCta")}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-ink-100">
              {lines.map((l) => {
                const k = keyOf(l);
                const img =
                  l.image && l.image.includes("images.unsplash.com")
                    ? unsplash(l.image, 200, 250)
                    : l.image;
                return (
                  <li key={k} className="py-4 flex gap-4">
                    <div className="size-20 rounded-xl overflow-hidden bg-ink-100 shrink-0">
                      {img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={img} alt={l.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-2xl text-clay-400">
                          أ
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink-900 text-sm line-clamp-2">{l.title}</p>
                      {l.size && (
                        <p className="text-xs text-ink-400 mt-0.5">
                          {t("size")}: {l.size}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-clay-600 mt-1">
                        {fmt(l.price_dzd, locale)} {tShop("currency")}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-ink-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setQty(k, l.qty - 1)}
                            className="p-1.5 hover:bg-ink-100 rounded-s-lg"
                            aria-label="-"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="px-3 text-sm tabular-nums">{l.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(k, l.qty + 1)}
                            className="p-1.5 hover:bg-ink-100 rounded-e-lg"
                            aria-label="+"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(k)}
                          className="text-ink-400 hover:text-rose-deep p-1"
                          aria-label={t("remove")}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-ink-100 p-5 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-ink-700">{t("total")}</span>
                <span className="font-semibold text-ink-900">
                  {fmt(total, locale)} {tShop("currency")}
                </span>
              </div>
              <Link href={`/${locale}/checkout`} onClick={() => setOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  {t("checkout")}
                </Button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
