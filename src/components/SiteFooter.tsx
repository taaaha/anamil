import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import { Logo } from "./Logo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const exploreLinks = [
    { key: "shop", path: "shop" },
    { key: "archive", path: "archive" },
    { key: "story", path: "story" },
    { key: "blog", path: "blog" },
  ] as const;

  const companyLinks = [
    { key: "about", path: "about" },
    { key: "empowerment", path: "empowerment" },
    { key: "tourism", path: "tourism" },
    { key: "contact", path: "contact" },
  ] as const;

  return (
    <footer className="bg-ink-900 text-sand-100 pt-16 pb-8 mt-12">
      <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5 lg:col-span-1">
          <Logo variant="footer" />
          <p className="text-sm text-sand-200/80 leading-relaxed max-w-xs">
            {t("tagline")}
          </p>
          <div className="flex items-center gap-2 text-sand-300">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-lg hover:bg-ink-700 transition-colors"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-lg hover:bg-ink-700 transition-colors"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50 mb-4">
            {t("explore")}
          </h3>
          <ul className="space-y-2 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={`/${locale}/${l.path}`}
                  className="text-sand-200 hover:text-clay-300 transition-colors"
                >
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50 mb-4">
            {t("company")}
          </h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={`/${locale}/${l.path}`}
                  className="text-sand-200 hover:text-clay-300 transition-colors"
                >
                  {tNav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-50 mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-sand-200">
            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0 text-clay-400" />
              <span>{tContact("address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-clay-400" />
              <a
                href={`mailto:${tContact("email")}`}
                className="hover:text-clay-300"
              >
                {tContact("email")}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-clay-400" />
              <span>{tContact("phone")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-300">
        <p>
          © {year} {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/faq`} className="hover:text-clay-300">
            {tNav("faq")}
          </Link>
          <Link href={`/${locale}/login`} className="hover:text-clay-300">
            {tNav("login")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
