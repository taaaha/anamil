import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogEditor } from "../../_editors/BlogEditor";

export default async function NewPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  return (
    <>
      <Link href={`/${locale}/admin/blog`} className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-600 mb-6">
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("blog")}
      </Link>
      <h1 className="heading-3 mb-8">{t("addNew")}</h1>
      <BlogEditor />
    </>
  );
}
