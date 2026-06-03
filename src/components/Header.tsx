"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/data/site";
import CartButton from "./cart/CartButton";

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
      {/* Tiny contact strip: issue #3, email & phone visible up top */}
      <div className="hidden md:flex items-center justify-end gap-6 px-6 lg:px-10 pt-2 text-[0.7rem] tracking-wide text-ink-soft">
        <a href={`mailto:${site.contact.email}`} className="hover:text-clay transition-colors">
          {site.contact.email}
        </a>
        <span className="text-ink/20">·</span>
        <a href={site.contact.phoneHref} className="hover:text-clay transition-colors">
          {site.contact.phone}
        </a>
      </div>

      <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 lg:px-10 py-3 lg:gap-8">
        {/* left: logo + nav */}
        <div className="flex items-center gap-7 justify-self-start">
          <a href="#top" className="group flex items-baseline gap-2">
            <span className="font-display text-2xl lg:text-3xl tracking-tight">
              Madessa
            </span>
            <span className="hidden sm:inline h-1.5 w-1.5 rounded-full bg-clay transition-transform duration-500 group-hover:scale-150" />
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm tracking-wide text-ink/75 hover:text-ink transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* center: wide search */}
        <button
          onClick={() => window.dispatchEvent(new Event("madessa:open-search"))}
          aria-label="Search products"
          className="group hidden md:flex w-full max-w-xl items-center gap-3 justify-self-center rounded-full border border-ink/15 bg-paper/60 px-5 py-3 text-sm text-ink-soft backdrop-blur transition-colors hover:border-clay/60 hover:bg-paper"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4.5 w-4.5 text-clay">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <span className="flex-1 text-left">Search dresses, sets, knitwear, baby &amp; mama…</span>
          <kbd className="rounded border border-ink/15 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider">
            ⌘K
          </kbd>
        </button>

        {/* right: cart + mobile controls */}
        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
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
          <CartButton />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`h-px w-6 bg-ink transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-paper/95 backdrop-blur-xl border-t border-ink/10"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl py-2 border-b border-ink/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-1 text-sm text-ink-soft">
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              </div>
              <a
                href={site.shopUrl}
                target="_blank"
                rel="noopener"
                className="mt-4 text-center rounded-full bg-ink text-paper px-5 py-3 text-sm tracking-wide"
              >
                Shop now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
