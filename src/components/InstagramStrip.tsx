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
    <section id="community" className="px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            {t("ig.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {igPre}
            <a href={site.socials.instagram} target="_blank" rel="noopener" className="text-clay hover:underline">
              {site.socials.instagramHandle}
            </a>
            {igPost}
          </h2>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.03]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            {t("ig.cta")}
          </a>
        </Reveal>

        <div className="mt-12 grid auto-rows-[1fr] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {grid.map((src, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.05}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
            >
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener"
                aria-label="View on Instagram"
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
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
