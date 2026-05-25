import * as React from "react";
import { cn } from "@/lib/cn";

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-10 sm:mb-14",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay-500 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="heading-2">{title}</h2>
      {subtitle && <p className="lead mt-4">{subtitle}</p>}
    </div>
  );
}
