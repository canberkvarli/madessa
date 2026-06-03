"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { useCatalog } from "@/components/catalog/CatalogContext";
import { useT } from "@/components/i18n/LocaleContext";

export default function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const { t } = useT();
  const { deal, products } = useCatalog();
  const [titlePre, titlePost] = t("hero.titleTemplate").split("{0}");
  const featured = deal; // best current deal
  const faces = [site.heroImage, featured.image, products[1]?.image].filter(
    Boolean,
  ) as string[];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* atmospheric background washes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-sage/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-12 pt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-10 lg:pt-16">
        {/*  Copy  */}
        <div className="relative z-10">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-6 font-display text-[3.1rem] leading-[0.98] tracking-[-0.02em] sm:text-7xl lg:text-[5rem]"
          >
            {titlePre}
            <span className="italic text-clay">{t("hero.titleEmph")}</span>
            {titlePost}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            {t("hero.subtitle")}
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
              {t("hero.cta1")}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-ink underline-offset-4 hover:underline"
            >
              {t("hero.cta2")}
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
              {faces.map((src, i) => (
                <span key={i} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-paper">
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <div>
              <span className="text-clay">★★★★★</span>
              <p className="text-xs">{t("hero.trust")}</p>
            </div>
          </motion.div>
        </div>

        {/* Image: framed so the full subject is always visible (fix #5) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2.8rem] rounded-tr-[8rem] shadow-[0_50px_90px_-40px_rgba(44,38,34,0.6)] ring-1 ring-ink/10 lg:aspect-[5/6]">
            <Image
              src={site.heroImage}
              alt="A little one in a handmade Madessa dress"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 600px"
              className="object-cover object-[50%_26%]"
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

          {/* rotating stamp seal */}
          <div className="absolute -top-5 -right-3 hidden h-28 w-28 place-items-center sm:grid">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-ink">
              <defs>
                <path id="sealPath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text
                fill="currentColor"
                fontSize="8.6"
                fontWeight="500"
                letterSpacing="0.6"
                textLength="226"
                lengthAdjust="spacingAndGlyphs"
                style={{ textTransform: "uppercase" }}
              >
                <textPath href="#sealPath" startOffset="0">
                  Handmade with care · Made by a family ·
                </textPath>
              </text>
            </svg>
            <span className="text-lg text-clay">✿</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
