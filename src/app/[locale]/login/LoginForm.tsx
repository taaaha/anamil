"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { signIn, type LoginState } from "./actions";
import { Button } from "@/components/ui/Button";

const initial: LoginState = { status: "idle" };

export function LoginForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [state, action, pending] = useActionState(signIn, initial);

  return (
    <form action={action} className="surface-card p-6 sm:p-8 grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-700">{t("email")}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-700">{t("password")}</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
        />
      </label>
      {state.status === "error" && (
        <p className="text-sm text-rose-deep">{state.message}</p>
      )}
      <Button type="submit" size="lg" variant="primary" disabled={pending}>
        {pending ? "…" : t("signIn")}
      </Button>
    </form>
  );
}
