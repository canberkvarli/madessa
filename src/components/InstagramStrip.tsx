"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { useCatalog } from "@/components/catalog/CatalogContext";
import { useT } from "@/components/i18n/LocaleContext";

export default function InstagramStrip() {
  const { products } = useCatalog();
  const { t } = useT();
  const [igPre, igPost] = t("ig.headingTemplate").split("{0}");
  // Uses stable product imagery as the social grid (IG CDN links expire).
  const grid = products.slice(0, 6);
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

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {grid.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.05}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <a href={site.socials.instagram} target="_blank" rel="noopener">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-paper opacity-0 transition-all duration-300 group-hover:bg-ink/35 group-hover:opacity-100">
                  ✿
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
