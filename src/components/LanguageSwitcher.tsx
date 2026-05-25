"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    const segments = pathname.split("/");
    segments[1] = next;
    const nextPath = segments.join("/") || `/${next}`;
    startTransition(() => router.replace(nextPath));
  }

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
      >
        <Globe className="size-4" aria-hidden />
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
        <ChevronDown
          className={cn(
            "size-3.5 text-ink-400 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 min-w-[10rem] surface-card py-1 z-50 shadow-lg"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => switchTo(l)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-sand-100 transition-colors",
                    active && "text-clay-600 font-semibold"
                  )}
                >
                  <span>{localeLabels[l]}</span>
                  {active && <Check className="size-4 text-clay-500" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
