"use client";

import { nav, helpNav, site } from "@/data/site";
import { useT } from "./i18n/LocaleContext";

export default function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();
  const legal = [
    { label: t("nav.shipping"), href: "/shipping" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Returns", href: "/returns" },
  ];

  return (
    <footer id="contact" className="bg-ink px-6 pb-10 pt-16 text-paper lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_0.8fr_0.9fr_1fr]">
          {/* brand + contact */}
          <div>
            <p className="font-display text-3xl">Madessa</p>
            <p className="mt-3 max-w-xs text-paper/60">{site.tagline}</p>

            <div className="mt-6 space-y-2 text-sm">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay">
                <span className="text-clay">✉</span> {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay">
                <span className="text-clay">☎</span> {site.contact.phone}
              </a>
              <a href={site.contact.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay">
                <span className="text-clay">✺</span> WhatsApp
              </a>
              <p className="flex items-center gap-3 text-paper/60">
                <span className="text-clay">✿</span> {site.contact.location}
              </p>
            </div>
          </div>

          {/* explore */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">{t("footer.explore")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-paper/80 transition-colors hover:text-clay">{t(n.key)}</a>
                </li>
              ))}
              <li>
                <a href={site.shopUrl} target="_blank" rel="noopener" className="text-paper/80 transition-colors hover:text-clay">
                  {t("footer.fullshop")}
                </a>
              </li>
            </ul>
          </div>

          {/* help */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">{t("footer.help")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {helpNav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-paper/80 transition-colors hover:text-clay">{t(n.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* social + offer */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">{t("footer.stay")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={site.socials.instagram} target="_blank" rel="noopener" className="text-paper/80 transition-colors hover:text-clay">
                  Instagram {site.socials.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.socials.tiktok} target="_blank" rel="noopener" className="text-paper/80 transition-colors hover:text-clay">
                  TikTok
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-2xl bg-paper/10 p-4 text-sm">
              <p className="font-display text-lg text-clay">{t("footer.offerTitle")}</p>
              <p className="text-paper/60">{t("footer.offerSub")}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-paper/10 pt-6 text-xs text-paper/50">
          {legal.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-clay">{l.label}</a>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-paper/40 sm:flex-row">
          <p>© {year} Madessa. {t("footer.rights")}</p>
          <p>{t("footer.madeby")}</p>
        </div>
      </div>
    </footer>
  );
}
