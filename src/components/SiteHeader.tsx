"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";

const navKeys = [
  "shop",
  "archive",
  "story",
  "empowerment",
  "tourism",
  "about",
  "blog",
] as const;

const navHrefMap: Record<(typeof navKeys)[number], string> = {
  shop: "shop",
  archive: "archive",
  story: "story",
  empowerment: "empowerment",
  tourism: "tourism",
  about: "about",
  blog: "blog",
};

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(path: string) {
    const full = `/${locale}${path ? `/${path}` : ""}`;
    if (path === "") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-sand-50/95 backdrop-blur-md border-b border-ink-100 shadow-sm"
          : "bg-sand-50/70 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="container-page flex items-center justify-between h-16 lg:h-20 gap-6">
        <Logo variant="header" />

        <nav className="hidden lg:flex items-center gap-0.5">
          {navKeys.map((key) => {
            const path = navHrefMap[key];
            const href = `/${locale}${path ? `/${path}` : ""}`;
            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(path)
                    ? "text-clay-700"
                    : "text-ink-600 hover:text-ink-900"
                )}
              >
                {t(key)}
                {isActive(path) && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-clay-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher className="hidden sm:block" />
          <Link href={`/${locale}/shop`} className="hidden sm:inline-flex">
            <Button variant="primary" size="sm">
              <ShoppingBag className="size-4" />
              {t("shop")}
            </Button>
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-ink-100 transition-colors"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-sand-50">
          <nav className="container-page py-3 flex flex-col gap-0.5">
            {navKeys.map((key) => {
              const path = navHrefMap[key];
              const href = `/${locale}${path ? `/${path}` : ""}`;
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive(path)
                      ? "text-clay-700 bg-clay-50"
                      : "text-ink-700 hover:bg-ink-100"
                  )}
                >
                  {t(key)}
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-ink-100 flex items-center justify-between">
              <LanguageSwitcher />
              <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm">
                  {t("contact")}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
