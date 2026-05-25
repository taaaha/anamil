"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactState } from "./actions";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="surface-card p-10 text-center">
        <CheckCircle2 className="size-12 text-clay-500 mx-auto mb-4" />
        <p className="text-lg font-semibold text-ink-900">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="surface-card p-6 sm:p-8 grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">
            {t("form.name")}
          </span>
          <input
            name="name"
            required
            className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">
            {t("form.email")}
          </span>
          <input
            name="email"
            type="email"
            required
            className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-700">
          {t("form.subject")}
        </span>
        <input
          name="subject"
          className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-700">
          {t("form.message")}
        </span>
        <textarea
          name="message"
          rows={6}
          required
          className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 resize-y"
        />
      </label>

      {state.status === "error" && (
        <p className="text-sm text-rose-deep">{state.message ?? t("error")}</p>
      )}

      <Button type="submit" size="lg" variant="primary" disabled={pending}>
        {pending ? "…" : t("form.submit")}
      </Button>
    </form>
  );
}
