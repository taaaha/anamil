"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitBooking, type BookingState } from "./actions";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const initialState: BookingState = { status: "idle" };

export function BookingForm() {
  const t = useTranslations("tourism");
  const tExp = useTranslations("tourism.experiences");
  const [state, action, pending] = useActionState(submitBooking, initialState);

  const fields = [
    { name: "full_name", label: t("form.name"), type: "text", required: true },
    { name: "email", label: t("form.email"), type: "email", required: true },
    { name: "phone", label: t("form.phone"), type: "tel", required: false },
  ];

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
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink-700">{f.label}</span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
            />
          </label>
        ))}
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">
            {t("form.experience")}
          </span>
          <select
            name="experience"
            required
            className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
          >
            <option value="workshop">{tExp("workshop")}</option>
            <option value="tryOn">{tExp("tryOn")}</option>
            <option value="embroidery">{tExp("embroidery")}</option>
            <option value="photo">{tExp("photo")}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">{t("form.date")}</span>
          <input
            name="preferred_date"
            type="date"
            required
            className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink-700">
            {t("form.people")}
          </span>
          <input
            name="party_size"
            type="number"
            min="1"
            max="50"
            defaultValue="2"
            required
            className="h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink-700">{t("form.notes")}</span>
        <textarea
          name="notes"
          rows={4}
          className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 resize-y"
        />
      </label>

      {state.status === "error" && (
        <p className="text-sm text-rose-deep">{state.message}</p>
      )}

      <Button type="submit" size="lg" variant="primary" disabled={pending}>
        {pending ? "…" : t("form.submit")}
      </Button>
    </form>
  );
}
