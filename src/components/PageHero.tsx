import { SmartImage } from "./SmartImage";
import { BerberRule } from "./patterns/Berber";
import { cn } from "@/lib/cn";

/**
 * Consistent page header used across all secondary pages.
 *  - mode="image": cinematic dark photo background
 *  - mode="light": clean cream header with a Berber rule accent
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  mode = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  mode?: "image" | "light";
}) {
  if (mode === "image") {
    return (
      <section className="relative isolate overflow-hidden bg-ink-900 text-sand-50">
        <SmartImage
          src={image}
          alt=""
          width={2000}
          priority
          className="absolute inset-0 w-full h-full"
          imgClassName="opacity-45"
          fallbackClassName="from-ink-700 via-clay-700 to-clay-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/65 to-ink-900" />
        <div className="container-page relative py-20 sm:py-28">
          {eyebrow && <p className="eyebrow !text-clay-300 mb-3">{eyebrow}</p>}
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sand-50 max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-sand-200/85 text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-sand-100 to-sand-50 texture-weave">
      <div className="container-page py-14 sm:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className={cn("heading-1 max-w-3xl")}>{title}</h1>
        {subtitle && <p className="lead mt-5 max-w-2xl text-lg">{subtitle}</p>}
        <BerberRule className="mt-7 w-40 h-4 text-clay-300" />
      </div>
    </section>
  );
}
