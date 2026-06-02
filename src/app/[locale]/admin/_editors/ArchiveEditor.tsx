"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Text, Select, LocalizedGroup } from "@/components/admin/Field";
import { Button } from "@/components/ui/Button";
import { saveArchiveItem } from "../actions";
import type { ArchiveItem } from "@/lib/supabase/types";

const KINDS = ["photo", "interview", "timeline", "symbol", "map"];

export function ArchiveEditor({ item }: { item?: ArchiveItem }) {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await saveArchiveItem(new FormData(e.currentTarget));
    setPending(false);
    if (res.ok) {
      router.push(`/${locale}/admin/archive`);
      router.refresh();
    } else setError(res.error ?? "Error");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid sm:grid-cols-3 gap-4">
        <Text name="slug" label="Slug" defaultValue={item?.slug} required dir="ltr" />
        <Select
          name="kind"
          label="Kind"
          defaultValue={item?.kind ?? "photo"}
          options={KINDS.map((k) => ({ value: k, label: k }))}
        />
        <Text name="year" label="Year" type="number" defaultValue={item?.year} dir="ltr" />
      </div>
      <LocalizedGroup base="title" label="Title" values={item?.title} />
      <LocalizedGroup base="description" label="Description" values={item?.description} area />
      <Text name="media_url" label="Media URL (image/video)" defaultValue={item?.media_url} dir="ltr" />
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
