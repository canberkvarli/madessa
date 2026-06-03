"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/data/site";
import CartButton from "./cart/CartButton";
import WishlistButton from "./wishlist/WishlistButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/80 backdrop-blur-xl border-b border-ink/10 shadow-[0_8px_30px_-18px_rgba(44,38,34,0.4)]"
          : "bg-transparent"
      }`}
    >
      {/* main row: logo · big search · cart */}
      <div className="flex items-center gap-4 px-6 py-3.5 lg:gap-8 lg:px-10">
        <a href="/" className="group flex shrink-0 items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight lg:text-3xl">
            Madessa
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-clay transition-transform duration-500 group-hover:scale-150 sm:inline" />
        </a>

        {/* big search — the hero of the header */}
        <div className="flex flex-1 justify-center">
          <button
            onClick={() => window.dispatchEvent(new Event("madessa:open-search"))}
            aria-label="Search products"
            className="group hidden w-full max-w-2xl items-center gap-3 rounded-full border border-ink/15 bg-paper/60 px-6 py-3.5 text-[0.95rem] text-ink-soft shadow-[0_2px_20px_-12px_rgba(44,38,34,0.5)] backdrop-blur transition-all duration-300 hover:border-clay/60 hover:bg-paper md:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 text-clay">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-left">Search dresses, sets, knitwear, baby &amp; mama…</span>
            <span className="text-ink/30 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* right: cart + mobile controls */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("madessa:open-search"))}
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-paper/50 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 text-clay">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
          </button>
          <WishlistButton />
          <CartButton />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* slim nav sub-row (desktop) */}
      <div className="relative hidden border-t border-ink/5 md:block">
        <div className="flex items-center justify-center gap-9 px-6 py-2.5 lg:px-10">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[0.78rem] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-clay"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-4 text-[0.72rem] text-ink-soft lg:right-10 lg:flex">
          <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-clay">
            {site.contact.email}
          </a>
          <span className="text-ink/20">·</span>
          <a href={site.contact.phoneHref} className="transition-colors hover:text-clay">
            {site.contact.phone}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-paper/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-1 px-6 py-7">
              {nav.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-ink/5 py-3 font-display text-3xl transition-colors hover:text-clay"
                >
                  {item.label}
                  <span className="text-base text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-clay">
                    0{i + 1}
                  </span>
                </a>
              ))}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1 text-sm text-ink-soft">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-clay">
                    {site.contact.email}
                  </a>
                  <a href={site.contact.phoneHref} className="hover:text-clay">
                    {site.contact.phone}
                  </a>
                </div>
                <a
                  href={site.shopUrl}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full bg-ink px-6 py-3 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
                >
                  Visit full shop →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
