"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCatalog } from "@/components/catalog/CatalogContext";
import { useCart } from "@/components/cart/CartContext";
import { useT } from "@/components/i18n/LocaleContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";

export default function QuickView() {
  const { bySlug, products } = useCatalog();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { t } = useT();
  const [slug, setSlug] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setSlug((e as CustomEvent<string>).detail);
      setActive(0);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSlug(null);
    window.addEventListener("madessa:quickview", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("madessa:quickview", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = slug ? "hidden" : "";
  }, [slug]);

  const product = slug ? bySlug.get(slug) : null;
  const images = product ? product.images?.length ? product.images : [product.image] : [];
  const onSale = product?.compareAt != null;
  const related = product
    ? (() => {
        const sameCat = products.filter(
          (p) => p.slug !== product.slug && p.category === product.category,
        );
        const pool = sameCat.length >= 3 ? sameCat : products.filter((p) => p.slug !== product.slug);
        return pool.slice(0, 3);
      })()
    : [];

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-md" onClick={() => setSlug(null)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl bg-paper shadow-2xl ring-1 ring-ink/10 sm:grid-cols-2"
          >
            <button
              onClick={() => setSlug(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/80 backdrop-blur transition-colors hover:bg-cream"
            >
              ✕
            </button>

            {/* gallery */}
            <div className="flex flex-col gap-2 p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                <Image
                  src={images[active]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 360px"
                  className="object-cover"
                />
                {onSale && (
                  <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-ink">
                    −{Math.round((1 - product.price / (product.compareAt as number)) * 100)}%
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${
                        i === active ? "ring-clay" : "ring-transparent opacity-70"
                      }`}
                    >
                      <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* details */}
            <div className="flex flex-col p-6 sm:p-8">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft/70">
                {t(`cat.${product.category}`)}
              </p>
              <h2 className="mt-1 font-display text-3xl leading-tight">{product.title}</h2>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-3xl text-clay">€{product.price}</span>
                {onSale && (
                  <span className="mb-1 text-lg text-ink/35 line-through">€{product.compareAt}</span>
                )}
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                {t("klarna.line").replace("{0}", `€${(product.price / 3).toFixed(0)}`)}
              </p>
              {product.blurb && (
                <p className="mt-4 leading-relaxed text-ink-soft">{product.blurb}</p>
              )}

              <div className="mt-auto space-y-3 pt-6">
                <button
                  onClick={() => {
                    add(product.slug);
                    setSlug(null);
                  }}
                  className="w-full rounded-full bg-ink py-3.5 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
                >
                  {t("cart.add")} · €{product.price}
                </button>
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => toggle(product.slug)}
                    className="text-ink-soft underline-offset-4 hover:text-clay hover:underline"
                  >
                    {has(product.slug) ? "♥ Saved" : "♡ Save"}
                  </button>
                  <button
                    onClick={() => window.dispatchEvent(new Event("madessa:open-sizeguide"))}
                    className="text-ink-soft underline-offset-4 hover:text-clay hover:underline"
                  >
                    {t("shop.sizeguide")}
                  </button>
                </div>
              </div>

              {related.length > 0 && (
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
                    {t("qv.related")}
                  </p>
                  <div className="mt-3 flex gap-3">
                    {related.map((r) => (
                      <button
                        key={r.slug}
                        onClick={() => {
                          setSlug(r.slug);
                          setActive(0);
                        }}
                        className="group flex-1 text-left"
                        aria-label={r.title}
                      >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                          <Image src={r.image} alt={r.title} fill sizes="90px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <p className="mt-1 truncate text-[0.7rem]">€{r.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
