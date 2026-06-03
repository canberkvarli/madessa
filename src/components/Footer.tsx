import { nav, helpNav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink px-6 pb-10 pt-16 text-paper lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.5fr_0.8fr_0.9fr_1fr]">
          {/* brand + contact (issue #3) */}
          <div>
            <p className="font-display text-3xl">Madessa</p>
            <p className="mt-3 max-w-xs text-paper/60">{site.tagline}</p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay"
              >
                <span className="text-clay">✉</span> {site.contact.email}
              </a>
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay"
              >
                <span className="text-clay">☎</span> {site.contact.phone}
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-clay"
              >
                <span className="text-clay">✺</span> Chat on WhatsApp
              </a>
              <p className="flex items-center gap-3 text-paper/60">
                <span className="text-clay">✿</span> {site.contact.location}
              </p>
            </div>
          </div>

          {/* explore */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-paper/80 transition-colors hover:text-clay">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.shopUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-paper/80 transition-colors hover:text-clay"
                >
                  Full shop
                </a>
              </li>
            </ul>
          </div>

          {/* help */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">
              Help
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {helpNav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-paper/80 transition-colors hover:text-clay">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social + offer */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/40">
              Stay close
            </p>
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
              <p className="font-display text-lg text-clay">Free shipping over €50</p>
              <p className="text-paper/60">Ships worldwide · 1-2 days in NL</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Madessa. Handmade with care.</p>
          <p>Made by a family, for yours. ✿</p>
        </div>
      </div>
    </footer>
  );
}
