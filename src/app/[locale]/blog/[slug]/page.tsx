import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/data";
import { archiveImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  return { title: post?.title ?? "Not found" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const tCommon = await getTranslations("common");
  const tBlog = await getTranslations("blog");

  return (
    <Section className="bg-sand-50">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-clay-600 mb-8"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {tCommon("back")}
      </Link>

      <article className="max-w-3xl mx-auto">
        <div className="aspect-[16/9] rounded-3xl relative overflow-hidden mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={unsplash(post.cover_image && post.cover_image.includes("images.unsplash.com") ? post.cover_image : archiveImages.village_textiles, 1400, 790)}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-ink-400 mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(post.published_at).toLocaleDateString(locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            {tBlog("readingTime", { minutes: post.reading_minutes })}
          </span>
        </div>

        <h1 className="heading-2 mb-4">{post.title}</h1>
        <p className="lead mb-10">{post.excerpt}</p>

        <div className="prose prose-stone max-w-none text-ink-700 leading-relaxed whitespace-pre-line">
          {post.body}
        </div>
      </article>
    </Section>
  );
}
