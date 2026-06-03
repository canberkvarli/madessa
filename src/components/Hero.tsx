"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { products } from "@/data/products";

const featured = products[0]; // Little Muse Dress (on sale)

export default function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* atmospheric background washes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-sage/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-12 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pt-16">
        {/* ── Copy ── */}
        <div className="relative z-10">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            {site.offer.heroBadge}
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-6 font-display text-[3.1rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[5.3rem]"
          >
            Made by a
            <br />
            <span className="italic text-clay">family</span>, for
            <br />
            yours.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            Handmade details, natural fabrics and real, structured bows — never
            glued. Soft, sustainable clothing for little ones and the mamas who
            love them.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.03]"
            >
              Shop the collection
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-ink underline-offset-4 hover:underline"
            >
              Our story
            </a>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-sm text-ink-soft"
          >
            <div className="flex -space-x-2">
              {[site.heroImage, featured.image, products[2].image].map((src, i) => (
                <span key={i} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-paper">
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <div>
              <span className="text-clay">★★★★★</span>
              <p className="text-xs">Loved by 5,000+ families</p>
            </div>
          </motion.div>
        </div>

        {/* ── Image — framed so the full subject is always visible (fix #5) ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.4rem] rounded-tr-[7rem] shadow-[0_40px_80px_-40px_rgba(44,38,34,0.55)] ring-1 ring-ink/10">
            <Image
              src={site.heroImage}
              alt="A little one in a handmade Madessa dress"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
          </div>

          {/* floating sale card */}
          <motion.a
            href="#offer"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-paper/90 p-3 pr-5 shadow-xl ring-1 ring-ink/10 backdrop-blur sm:-left-6"
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-xl">
              <Image src={featured.image} alt={featured.title} fill sizes="56px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-ink-soft">{featured.title}</span>
              <span className="font-display text-lg">
                €{featured.price}
                {featured.compareAt && (
                  <span className="ml-1.5 text-sm text-ink/40 line-through">€{featured.compareAt}</span>
                )}
              </span>
            </span>
          </motion.a>

          {/* spinning free-shipping seal */}
          <div className="absolute -top-4 -right-2 hidden h-24 w-24 sm:grid place-items-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-ink">
              <defs>
                <path id="circlePath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="fill-current text-[0.62rem] uppercase tracking-[0.2em]">
                <textPath href="#circlePath">
                  Handmade with care · Free shipping €50 ·
                </textPath>
              </text>
            </svg>
            <span className="text-xl">✿</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
