"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Text, LocalizedGroup } from "@/components/admin/Field";
import { Button } from "@/components/ui/Button";
import { saveArtisan } from "../actions";
import type { Artisan } from "@/lib/supabase/types";

export function ArtisanEditor({ artisan }: { artisan?: Artisan }) {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await saveArtisan(new FormData(e.currentTarget));
    setPending(false);
    if (res.ok) {
      router.push(`/${locale}/admin/artisans`);
      router.refresh();
    } else setError(res.error ?? "Error");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      {artisan && <input type="hidden" name="id" value={artisan.id} />}
      <div className="grid sm:grid-cols-3 gap-4">
        <Text name="name" label="Name" defaultValue={artisan?.name} required />
        <Text name="village" label="Village" defaultValue={artisan?.village} />
        <Text name="years_experience" label="Years" type="number" defaultValue={artisan?.years_experience} dir="ltr" />
      </div>
      <LocalizedGroup base="bio" label="Bio" values={artisan?.bio} area />
      <Text name="photo_url" label="Photo URL" defaultValue={artisan?.photo_url} dir="ltr" />
      {error && <p className="text-sm text-rose-deep">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="md" disabled={pending}>
          {pending ? "…" : t("save")}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => router.back()}>
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
