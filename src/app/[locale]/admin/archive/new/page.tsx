import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArchiveEditor } from "../../_editors/ArchiveEditor";

export default async function NewArchive({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  return (
    <>
      <Link href={`/${locale}/admin/archive`} className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-clay-600 mb-6">
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t("archive")}
      </Link>
      <h1 className="heading-3 mb-8">{t("addNew")}</h1>
      <ArchiveEditor />
    </>
  );
}
