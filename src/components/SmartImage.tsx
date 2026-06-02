"use client";

import { useState } from "react";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/cn";

/**
 * Image with a guaranteed graceful fallback — if the source fails to load,
 * it shows a branded gradient instead of a broken-image icon. Keeps the UI
 * flawless even if a remote photo URL ever dies.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  fallbackClassName = "from-clay-400 via-clay-500 to-sand-400",
  priority,
}: {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const resolved =
    src && src.includes("images.unsplash.com") ? unsplash(src, width ?? 1200, height) : src;

  const showFallback = !resolved || failed;

  return (
    <span className={cn("block relative overflow-hidden bg-ink-100", className)}>
      {showFallback ? (
        <span
          className={cn(
            "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
            fallbackClassName
          )}
        >
          <span className="font-display text-5xl text-white/60 select-none">أ</span>
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={resolved}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 w-full h-full object-cover", imgClassName)}
          draggable={false}
        />
      )}
    </span>
  );
}
