"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useWishlist } from "./WishlistContext";
import { useCatalog } from "@/components/catalog/CatalogContext";
import { useCart } from "@/components/cart/CartContext";
import { productUrl } from "@/data/products";

export default function WishlistDrawer() {
  const { slugs, isOpen, close, remove } = useWishlist();
  const { bySlug } = useCatalog();
  const { add } = useCart();
  const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="font-display text-2xl">
                Favourites{" "}
                <span className="text-base text-ink-soft">({items.length})</span>
              </h2>
              <button
                onClick={close}
                aria-label="Close favourites"
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
              >
                ✕
              </button>
            </div>
            <div className="hairline mx-6" />

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="font-display text-5xl text-clay/30">♡</span>
                  <p className="mt-4 font-display text-xl">No favourites yet</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Tap the heart on anything you love to save it here.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {items.map((p) => (
                      <motion.li
                        key={p!.slug}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4"
                      >
                        <a
                          href={productUrl(p!.slug)}
                          target="_blank"
                          rel="noopener"
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                        >
                          <Image src={p!.image} alt={p!.title} fill sizes="80px" className="object-cover" />
                        </a>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="font-display text-base leading-tight">{p!.title}</p>
                            <button
                              onClick={() => remove(p!.slug)}
                              aria-label="Remove"
                              className="text-xs text-ink-soft hover:text-clay"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="font-display">
                            €{p!.price}
                            {p!.compareAt && (
                              <span className="ml-1 text-sm text-ink/35 line-through">€{p!.compareAt}</span>
                            )}
                          </p>
                          <button
                            onClick={() => add(p!.slug)}
                            className="mt-auto self-start rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-clay"
                          >
                            Add to bag
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
