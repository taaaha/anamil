import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { BlogPost } from "@/lib/supabase/types";
import { BlogEditor } from "../../_editors/BlogEditor";

export default async function EditPost({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <Link href={`/${locale}/admin/blog`} className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-600 mb-6">
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("blog")}
      </Link>
      <h1 className="heading-3 mb-8">{t("edit")}</h1>
      <BlogEditor post={data as BlogPost} />
    </>
  );
}
