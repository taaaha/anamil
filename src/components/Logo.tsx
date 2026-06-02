"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Variant = "header" | "footer" | "seal";

const dims: Record<Variant, string> = {
  header: "h-9 sm:h-11",
  footer: "h-12",
  seal: "h-40 sm:h-52 lg:h-60",
};

export function Logo({
  className,
  variant = "header",
}: {
  className?: string;
  variant?: Variant;
}) {
  const t = useTranslations("site");
  const locale = useLocale();
  const [errored, setErrored] = useState(false);

  return (
    <Link
      href={`/${locale}`}
      aria-label={t("name")}
      className={cn("inline-flex items-center shrink-0", className)}
    >
      {errored ? (
        <TextMark name={t("name")} variant={variant} />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/logo.png"
          alt={t("name")}
          onError={() => setErrored(true)}
          draggable={false}
          className={cn("w-auto select-none object-contain", dims[variant])}
        />
      )}
    </Link>
  );
}

function TextMark({ name, variant }: { name: string; variant: Variant }) {
  const isSeal = variant === "seal";
  const isFooter = variant === "footer";
  return (
    <span className={cn("inline-flex items-center gap-3", isSeal && "flex-col text-center gap-4")}>
      <span
        className={cn(
          "rounded-full bg-gradient-to-br from-clay-500 via-rose-deep to-heritage-green-dark flex items-center justify-center text-white font-display shadow-sm shrink-0",
          isSeal ? "size-28 text-5xl" : isFooter ? "size-12 text-xl" : "size-9 text-lg"
        )}
        aria-hidden
      >
        أ
      </span>
      <span
        className={cn(
          "font-display leading-tight tracking-tight",
          isFooter ? "text-base text-sand-50" : "text-sm sm:text-base text-ink-900",
          isSeal && "!text-xl !text-ink-900"
        )}
      >
        {name}
      </span>
    </span>
  );
}
