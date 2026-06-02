import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { BlogPost } from "@/lib/supabase/types";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteBlogPost } from "../actions";

export default async function AdminBlog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  const posts = (data as BlogPost[]) ?? [];

  return (
    <>
      <div className="flex items-center justify-between mb-8 gap-4">
        <h1 className="heading-3">{t("blog")}</h1>
        <Link href={`/${locale}/admin/blog/new`}>
          <Button variant="primary" size="sm">
            <Plus className="size-4" />
            {t("addNew")}
          </Button>
        </Link>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-ink-100 last:border-0">
                <td className="px-5 py-3">
                  <span className="font-medium text-ink-900">{p.title}</span>
                  <span className="ms-2 text-xs uppercase text-clay-500">{p.locale}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/${locale}/admin/blog/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-600 hover:bg-clay-50 px-2.5 py-1.5 rounded-lg"
                    >
                      <Pencil className="size-4" />
                      {t("edit")}
                    </Link>
                    <DeleteButton id={p.id} action={deleteBlogPost} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-5 py-12 text-center text-ink-400">{t("noData")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
