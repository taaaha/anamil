"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ShoppingBag } from "lucide-react";
import { useCart, type CartLine } from "./CartProvider";
import { Button } from "../ui/Button";
import { cn } from "@/lib/cn";

export function AddToCart({
  product,
  sizes,
  disabled,
}: {
  product: Omit<CartLine, "qty" | "size">;
  sizes?: string[] | null;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const t = useTranslations("shop");
  const tCart = useTranslations("cart");
  const [size, setSize] = useState<string | null>(sizes?.[0] ?? null);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    add({ ...product, size, qty: 1 });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="space-y-4">
      {sizes && sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink-700 mb-2">{t("sizes")}</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "h-10 min-w-[2.75rem] px-3 inline-flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                  s === size
                    ? "border-clay-500 bg-clay-50 text-clay-700"
                    : "border-ink-200 bg-white text-ink-700 hover:border-clay-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleAdd}
        disabled={disabled}
        className="w-full sm:w-auto"
      >
        {justAdded ? (
          <>
            <Check className="size-4" />
            {tCart("added")}
          </>
        ) : (
          <>
            <ShoppingBag className="size-4" />
            {disabled ? t("outOfStock") : t("addToCart")}
          </>
        )}
      </Button>
    </div>
  );
}
