"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { useCatalog } from "@/components/catalog/CatalogContext";
import { useT } from "./i18n/LocaleContext";

const KEY = "madessa-recent-v1";

export default function RecentlyViewed() {
  const { bySlug } = useCatalog();
  const { t } = useT();
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
    const onView = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setSlugs((prev) => {
        const next = [slug, ...prev.filter((s) => s !== slug)].slice(0, 8);
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    };
    window.addEventListener("madessa:quickview", onView);
    return () => window.removeEventListener("madessa:quickview", onView);
  }, []);

  const items = slugs.map((s) => bySlug.get(s)).filter(Boolean);
  if (items.length < 2) return null;

  return (
    <section className="px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl">{t("recent.heading")}</h2>
        </Reveal>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {items.map((p) => (
            <button
              key={p!.slug}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("madessa:quickview", { detail: p!.slug }))
              }
              className="group w-36 shrink-0 text-left sm:w-44"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-cream">
                <Image
                  src={p!.image}
                  alt={p!.title}
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 truncate font-display text-sm">{p!.title}</p>
              <p className="text-sm text-ink-soft">€{p!.price}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
