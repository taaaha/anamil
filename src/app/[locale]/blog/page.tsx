import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { listPosts } from "@/lib/data";
import { Calendar, Clock } from "lucide-react";
import { archiveImages, productImages, unsplash } from "@/lib/images";

const blogCovers = [
  archiveImages.village_textiles,
  productImages.embroidery_threadwork,
  archiveImages.woman_hillside,
  archiveImages.woman_desert,
  productImages.embroidery_linen,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = await listPosts(locale);

  return (
    <>
      <Section className="bg-gradient-to-br from-sand-100 to-clay-50 pb-12">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-600 mb-3">
          {t("title")}
        </p>
        <h1 className="heading-1 max-w-3xl">{t("subtitle")}</h1>
      </Section>

      <Section className="bg-sand-50 !pt-12">
        {posts.length === 0 ? (
          <p className="text-center text-ink-400 py-12">{t("emptyState")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="group surface-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-ink-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(post.cover_image && post.cover_image.includes("images.unsplash.com") ? post.cover_image : blogCovers[i % blogCovers.length], 800, 500)}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-ink-400 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3" />
                      {new Date(post.published_at).toLocaleDateString(locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3" />
                      {t("readingTime", { minutes: post.reading_minutes })}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-ink-900 group-hover:text-clay-600 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
