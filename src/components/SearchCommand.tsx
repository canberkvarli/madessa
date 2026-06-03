"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { products, productUrl, categories } from "@/data/products";
import { site } from "@/data/site";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  // Open via ⌘K / Ctrl+K / "/", or a custom event from the header button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !open && !/input|textarea/i.test((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("madessa:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("madessa:open-search", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.blurb.toLowerCase().includes(term),
    );
  }, [q]);

  useEffect(() => setActive(0), [q]);

  const go = (i: number) => {
    const p = results[i];
    if (p) window.open(productUrl(p.slug), "_blank", "noopener");
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(active);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            onKeyDown={onListKey}
            initial={reduce ? false : { opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-paper shadow-[0_40px_120px_-30px_rgba(44,38,34,0.6)] ring-1 ring-ink/10"
          >
            {/* input row */}
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 text-clay">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.2-3.2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search dresses, sets, knitwear…"
                className="w-full bg-transparent font-display text-xl outline-none placeholder:text-ink/35"
              />
              <kbd className="hidden rounded-md border border-ink/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-ink-soft sm:block">
                Esc
              </kbd>
            </div>

            {/* quick category chips */}
            {!q && (
              <div className="flex flex-wrap gap-2 px-5 py-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setQ(c)}
                    className="rounded-full border border-ink/15 px-3.5 py-1 text-xs tracking-wide text-ink-soft transition-colors hover:border-clay hover:text-clay"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* results */}
            <ul className="max-h-[46vh] overflow-y-auto px-2 pb-2">
              {results.length === 0 && (
                <li className="px-4 py-10 text-center text-ink-soft">
                  No matches for “{q}”. Try “dress” or “knit”.
                </li>
              )}
              {results.map((p, i) => (
                <li key={p.slug}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                      i === active ? "bg-cream" : ""
                    }`}
                  >
                    <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base">{p.title}</span>
                      <span className="text-xs uppercase tracking-wider text-ink-soft/70">{p.category}</span>
                    </span>
                    <span className="shrink-0 font-display">
                      €{p.price}
                      {p.compareAt && <span className="ml-1 text-xs text-ink/35 line-through">€{p.compareAt}</span>}
                    </span>
                    <span className={`shrink-0 text-clay transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`}>↵</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-ink/10 px-5 py-2.5 text-[0.7rem] text-ink-soft">
              <span>↑↓ to navigate · ↵ to open</span>
              <a href={site.shopUrl} target="_blank" rel="noopener" className="hover:text-clay">
                Browse full shop →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
