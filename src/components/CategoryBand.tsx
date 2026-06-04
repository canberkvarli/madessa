"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useT } from "./i18n/LocaleContext";
import { BLUR } from "@/lib/blur";

const G = "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/";

const categories = [
  { key: "Dresses", img: `${G}515595139_742684715115649_8159463199544968301_n.jpg?width=900` },
  { key: "Sets", img: `${G}MD_0075.jpg?width=900` },
  { key: "Knitwear", img: `${G}MD_2228.jpg?width=900` },
  { key: "Baby", img: `${G}MD_0878.jpg?width=900` },
  { key: "Maternity", img: `${G}MD_2067.jpg?width=900` },
];

function goToCategory(cat: string) {
  window.dispatchEvent(new CustomEvent("madessa:filter", { detail: cat }));
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
}

export default function CategoryBand() {
  const { t } = useT();

  return (
    <section className="px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            {t("cats.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            {t("cats.heading")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal
              key={c.key}
              delay={i * 0.07}
              className={i === 0 ? "col-span-2 md:col-span-1" : ""}
            >
              <button
                onClick={() => goToCategory(c.key)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={c.img}
                  alt={t(`cat.${c.key}`)}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR}
                  sizes="(max-width: 768px) 50vw, 18vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-paper">
                  <span className="font-display text-xl">{t(`cat.${c.key}`)}</span>
                  <span className="translate-x-0 text-sm opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
