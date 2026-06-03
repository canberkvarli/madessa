"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { type Product } from "@/data/products";
import { site } from "@/data/site";
import { useCatalog } from "@/components/catalog/CatalogContext";

export default function Collections() {
  const { products, categories } = useCatalog();
  const filters = ["All", ...categories];
  const [active, setActive] = useState<string>("All");
  const shown: Product[] =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="shop" className="px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
              The collection
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              Little wardrobes, made to be lived in
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-5 text-sm tracking-wide">
            <button
              onClick={() => window.dispatchEvent(new Event("madessa:open-sizeguide"))}
              className="underline-offset-4 hover:text-clay hover:underline"
            >
              Size guide
            </button>
            <a
              href={site.shopUrl}
              target="_blank"
              rel="noopener"
              className="underline-offset-4 hover:text-clay hover:underline"
            >
              View all on shop →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-5 py-2 text-sm tracking-wide transition-all duration-300 ${
                active === f
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
