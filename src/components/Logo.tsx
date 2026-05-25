"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Variant = "header" | "footer" | "seal";

const dimsByVariant: Record<Variant, string> = {
  header: "h-10 sm:h-12",
  footer: "h-14",
  seal: "h-44 sm:h-52 lg:h-60",
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
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showImage = !errored;

  return (
    <Link
      href={`/${locale}`}
      className={cn(
        "inline-flex items-center gap-3 group transition-opacity",
        className
      )}
      aria-label={t("name")}
    >
      {showImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/logo.png"
          alt={t("name")}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          draggable={false}
          className={cn(
            "w-auto select-none transition-opacity",
            dimsByVariant[variant],
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {(errored || !loaded) && (
        <TextMark name={t("name")} variant={variant} />
      )}
    </Link>
  );
}

function TextMark({ name, variant }: { name: string; variant: Variant }) {
  const isSeal = variant === "seal";
  const isFooter = variant === "footer";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        isSeal && "flex-col text-center gap-4"
      )}
    >
      <span
        className={cn(
          "rounded-full bg-gradient-to-br from-clay-500 via-rose-deep to-heritage-green-dark flex items-center justify-center text-white font-display shadow-sm shrink-0",
          isSeal ? "size-28 text-5xl" : isFooter ? "size-12 text-xl" : "size-10 text-lg"
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
