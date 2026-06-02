"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingBag, User, LayoutDashboard, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { BerberRule } from "./patterns/Berber";
import { useCart } from "./cart/CartProvider";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Auth = { email: string; isAdmin: boolean } | null;

const navKeys = [
  "shop",
  "archive",
  "story",
  "empowerment",
  "tourism",
  "about",
  "blog",
] as const;

export function SiteHeader({ auth }: { auth: Auth }) {
  const t = useTranslations("nav");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const tCart = useTranslations("cart");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { count, setOpen: setCartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(path: string) {
    const full = `/${locale}/${path}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  }

  function switchLocale(next: Locale) {
    if (next === locale) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.replace(segments.join("/") || `/${next}`);
  }

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-sand-50/95 backdrop-blur-md border-b border-ink-100 shadow-sm"
          : "bg-sand-50/80 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="container-page flex items-center justify-between h-16 lg:h-20 gap-4">
        <Logo variant="header" />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}/${key}`}
              className={cn(
                "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive(key) ? "text-clay-700" : "text-ink-600 hover:text-ink-900"
              )}
            >
              {t(key)}
              {isActive(key) && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-clay-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop right cluster */}
        <div className="hidden lg:flex items-center gap-2">
          <DesktopLangSwitcher current={locale} onSwitch={switchLocale} />
          {auth ? (
            <Link
              href={`/${locale}/${auth.isAdmin ? "admin" : "account"}`}
              className="inline-flex items-center gap-2 h-10 px-3 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
            >
              {auth.isAdmin ? (
                <LayoutDashboard className="size-4 text-clay-600" />
              ) : (
                <User className="size-4 text-clay-600" />
              )}
              <span className="max-w-[8rem] truncate">
                {auth.isAdmin ? tAuth("adminPanel") : tAuth("account")}
              </span>
            </Link>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-2 h-10 px-3 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
            >
              <User className="size-4" />
              {tAuth("signIn")}
            </Link>
          )}
          <CartButton count={count} onClick={() => setCartOpen(true)} label={tCart("title")} />
        </div>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-1 lg:hidden">
          <CartButton count={count} onClick={() => setCartOpen(true)} label={tCart("title")} />
          <button
            type="button"
            className="-me-1 p-2.5 rounded-xl text-ink-800 hover:bg-ink-100 transition-colors"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </header>

      {/* ─── Mobile drawer — sibling of <header> so the header's
           backdrop-blur doesn't trap its fixed positioning ─── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[60] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        {/* panel */}
        <div
          className={cn(
            "absolute inset-y-0 end-0 w-[88%] max-w-sm bg-sand-50 shadow-2xl flex flex-col transition-transform duration-300",
            open ? "translate-x-0" : "ltr:translate-x-full rtl:-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-ink-100">
            <Logo variant="header" />
            <button
              type="button"
              className="p-2.5 -me-2 rounded-xl text-ink-800 hover:bg-ink-100"
              aria-label="close"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            {/* Nav links — big touch targets */}
            <nav className="flex flex-col">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={`/${locale}/${key}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-3.5 text-lg font-medium border-b border-ink-100/70 transition-colors",
                    isActive(key) ? "text-clay-700" : "text-ink-800"
                  )}
                >
                  {t(key)}
                  <span className="text-ink-300 rtl:rotate-180">›</span>
                </Link>
              ))}
            </nav>

            {/* Account block */}
            <div className="mt-6">
              {auth ? (
                <Link
                  href={`/${locale}/${auth.isAdmin ? "admin" : "account"}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-ink-100"
                >
                  {auth.isAdmin ? (
                    <LayoutDashboard className="size-5 text-clay-600" />
                  ) : (
                    <User className="size-5 text-clay-600" />
                  )}
                  <span className="text-sm">
                    <span className="block font-medium text-ink-900">
                      {auth.isAdmin ? tAuth("adminPanel") : tAuth("account")}
                    </span>
                    <span className="block text-ink-400 text-xs truncate max-w-[14rem]" dir="ltr">
                      {auth.email}
                    </span>
                  </span>
                </Link>
              ) : (
                <Link href={`/${locale}/login`} onClick={() => setOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    <User className="size-4" />
                    {tAuth("signIn")} / {tAuth("signUp")}
                  </Button>
                </Link>
              )}
            </div>

            {/* Language — visible pills */}
            <div className="mt-8">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-400 mb-3">
                <Globe className="size-4" />
                {tCommon("language")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      switchLocale(l);
                      setOpen(false);
                    }}
                    className={cn(
                      "h-12 rounded-xl text-sm font-semibold border transition-colors",
                      l === locale
                        ? "bg-clay-600 text-white border-clay-600"
                        : "bg-white text-ink-700 border-ink-200 hover:border-clay-400"
                    )}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-5 py-5 border-t border-ink-100">
            <BerberRule className="w-32 h-3 text-clay-300 mx-auto mb-4" />
            <Link href={`/${locale}/shop`} onClick={() => setOpen(false)}>
              <Button variant="primary" size="lg" className="w-full">
                <ShoppingBag className="size-4" />
                {t("shop")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function CartButton({
  count,
  onClick,
  label,
}: {
  count: number;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative p-2.5 rounded-xl text-ink-800 hover:bg-ink-100 transition-colors"
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -end-0.5 min-w-[1.15rem] h-[1.15rem] px-1 rounded-full bg-clay-600 text-white text-[0.7rem] font-semibold flex items-center justify-center tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}

function DesktopLangSwitcher({
  current,
  onSwitch,
}: {
  current: Locale;
  onSwitch: (l: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="size-4" />
        {localeLabels[current]}
      </button>
      {open && (
        <ul className="absolute end-0 mt-2 min-w-[10rem] surface-card py-1 z-50 shadow-lg">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  onSwitch(l);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-start px-4 py-2.5 text-sm hover:bg-sand-100 transition-colors",
                  l === current && "text-clay-600 font-semibold"
                )}
              >
                {localeLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
