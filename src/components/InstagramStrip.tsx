"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { site, gallery } from "@/data/site";
import { useT } from "@/components/i18n/LocaleContext";

export default function InstagramStrip() {
  const { t } = useT();
  const [igPre, igPost] = t("ig.headingTemplate").split("{0}");
  // Real lifestyle photography (stable Shopify CDN; IG feed links expire).
  const grid = gallery;
  return (
    <section className="px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
              {t("ig.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              {igPre}
              {site.socials.instagramHandle}
              {igPost}
            </h2>
          </div>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener"
            className="text-sm tracking-wide underline-offset-4 hover:text-clay hover:underline"
          >
            {t("ig.cta")}
          </a>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {grid.map((src, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <a href={site.socials.instagram} target="_blank" rel="noopener" aria-label="View on Instagram">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fbf6ee" strokeWidth="1.6" className="h-7 w-7">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#fbf6ee" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
