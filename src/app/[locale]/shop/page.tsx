import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { ShopGrid } from "@/components/ShopGrid";
import { listProducts } from "@/lib/data";
import { productImages, unsplash } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title") };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  const products = await listProducts();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-900 text-sand-50 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unsplash(productImages.textile_stack, 2000)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/65 to-ink-900" />
        <div className="container-page relative">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-clay-300 mb-3">
            {locale === "ar" ? "متجر" : locale === "fr" ? "Boutique" : "Shop"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-sand-50">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sand-200 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <Section className="bg-sand-50 !pt-8">
        <ShopGrid products={products} />
      </Section>
    </>
  );
}
