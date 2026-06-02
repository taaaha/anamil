"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Text, Area, Select } from "@/components/admin/Field";
import { Button } from "@/components/ui/Button";
import { saveBlogPost } from "../actions";
import type { BlogPost } from "@/lib/supabase/types";

export function BlogEditor({ post }: { post?: BlogPost }) {
  const t = useTranslations("admin");
  const locale = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await saveBlogPost(new FormData(e.currentTarget));
    setPending(false);
    if (res.ok) {
      router.push(`/${locale}/admin/blog`);
      router.refresh();
    } else setError(res.error ?? "Error");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-3xl">
      {post && <input type="hidden" name="id" value={post.id} />}
      <div className="grid sm:grid-cols-3 gap-4">
        <Text name="slug" label="Slug" defaultValue={post?.slug} required dir="ltr" />
        <Select
          name="locale"
          label="Language"
          defaultValue={post?.locale ?? "ar"}
          options={[
            { value: "ar", label: "العربية" },
            { value: "fr", label: "Français" },
            { value: "en", label: "English" },
          ]}
        />
        <Text name="reading_minutes" label="Min" type="number" defaultValue={post?.reading_minutes ?? 5} dir="ltr" />
      </div>
      <Text name="title" label="Title" defaultValue={post?.title} required />
      <Text name="cover_image" label="Cover image URL" defaultValue={post?.cover_image} dir="ltr" />
      <Area name="excerpt" label="Excerpt" defaultValue={post?.excerpt} rows={2} />
      <Area name="body" label="Body" defaultValue={post?.body} rows={12} />
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
