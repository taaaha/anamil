"use client";

import { useActionState, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { signIn, signUp, type AuthState } from "./actions";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/cn";

const initial: AuthState = { status: "idle" };

export function AuthForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [tab, setTab] = useState<"login" | "signup">("login");

  const [loginState, loginAction, loginPending] = useActionState(signIn, initial);
  const [signupState, signupAction, signupPending] = useActionState(signUp, initial);

  const state = tab === "login" ? loginState : signupState;
  const action = tab === "login" ? loginAction : signupAction;
  const pending = tab === "login" ? loginPending : signupPending;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-ink-100 mb-6">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={cn(
            "h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors",
            tab === "login"
              ? "bg-white text-clay-700 shadow-sm"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <LogIn className="size-4" />
          {t("loginTab")}
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={cn(
            "h-11 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors",
            tab === "signup"
              ? "bg-white text-clay-700 shadow-sm"
              : "text-ink-500 hover:text-ink-700"
          )}
        >
          <UserPlus className="size-4" />
          {t("signupTab")}
        </button>
      </div>

      {state.status === "success" && state.mode === "signup" ? (
        <div className="text-center py-8">
          <CheckCircle2 className="size-12 text-heritage-green mx-auto mb-4" />
          <p className="text-ink-700 leading-relaxed">{state.message}</p>
        </div>
      ) : (
        <form action={action} className="grid gap-4" key={tab}>
          <input type="hidden" name="locale" value={locale} />
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">{t("email")}</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
              className="h-12 rounded-xl border border-ink-200 bg-white px-4 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-400"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">{t("password")}</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              dir="ltr"
              className="h-12 rounded-xl border border-ink-200 bg-white px-4 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-400"
            />
          </label>

          {state.status === "error" && (
            <p className="text-sm text-rose-deep bg-rose-deep/5 border border-rose-deep/20 rounded-lg px-3 py-2">
              {state.message}
            </p>
          )}

          <Button type="submit" size="lg" variant="primary" disabled={pending} className="mt-2">
            {pending ? "…" : tab === "login" ? t("signIn") : t("signUp")}
          </Button>

          <p className="text-sm text-ink-500 text-center mt-1">
            {tab === "login" ? t("noAccount") : t("haveAccount")}{" "}
            <button
              type="button"
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-clay-600 font-medium hover:underline"
            >
              {tab === "login" ? t("signupTab") : t("loginTab")}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
