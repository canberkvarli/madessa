"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartContext";
import { productUrl } from "@/data/products";

export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isOpen,
    close,
    setQty,
    remove,
    checkoutUrl,
    freeShipThreshold,
    remainingForFreeShip,
  } = useCart();

  const pct = Math.min(100, (subtotal / freeShipThreshold) * 100);

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
            {/* header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="font-display text-2xl">
                Your bag{" "}
                <span className="text-base text-ink-soft">({count})</span>
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
              >
                ✕
              </button>
            </div>

            {/* free shipping progress */}
            <div className="px-6 pb-4">
              <p className="text-sm text-ink-soft">
                {remainingForFreeShip > 0 ? (
                  <>
                    You&apos;re{" "}
                    <span className="font-medium text-clay">
                      €{remainingForFreeShip}
                    </span>{" "}
                    away from free shipping ✿
                  </>
                ) : (
                  <span className="font-medium text-sage-deep">
                    You&apos;ve unlocked free shipping! ✿
                  </span>
                )}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream">
                <motion.div
                  className="h-full rounded-full bg-clay"
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                />
              </div>
            </div>

            <div className="hairline mx-6" />

            {/* lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="font-display text-5xl text-clay/30">✿</span>
                  <p className="mt-4 font-display text-xl">Your bag is empty</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Handmade pieces, made to be loved.
                  </p>
                  <button
                    onClick={close}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
                  >
                    Start shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.product.slug}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4"
                      >
                        <a
                          href={productUrl(l.product.slug)}
                          target="_blank"
                          rel="noopener"
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                        >
                          <Image
                            src={l.product.image}
                            alt={l.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </a>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="font-display text-base leading-tight">
                              {l.product.title}
                            </p>
                            <button
                              onClick={() => remove(l.product.slug)}
                              aria-label="Remove"
                              className="text-xs text-ink-soft hover:text-clay"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-xs uppercase tracking-wider text-ink-soft/70">
                            {l.product.category}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-ink/15">
                              <button
                                onClick={() => setQty(l.product.slug, l.qty - 1)}
                                className="grid h-8 w-8 place-items-center text-lg leading-none hover:text-clay"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => setQty(l.product.slug, l.qty + 1)}
                                className="grid h-8 w-8 place-items-center text-lg leading-none hover:text-clay"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-display">
                              €{l.product.price * l.qty}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* footer / checkout */}
            {lines.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-display text-2xl">€{subtotal}</span>
                </div>
                <p className="mt-1 text-xs text-ink-soft">
                  Taxes and shipping calculated at checkout.
                </p>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.01]"
                >
                  Checkout securely
                  <span aria-hidden>→</span>
                </a>
                <p className="mt-3 text-center text-xs text-ink-soft">
                  🔒 Secure checkout powered by Shopify
                </p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
