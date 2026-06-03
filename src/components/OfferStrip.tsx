"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { products, productUrl } from "@/data/products";

const muse = products[0];

// A gentle, ever-present urgency window (resets every 24h) — no fake dates baked in.
function useCountdown() {
  const [left, setLeft] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setLeft({
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 6e4),
        s: Math.floor((diff % 6e4) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function OfferStrip() {
  const t = useCountdown();
  const off = muse.compareAt
    ? Math.round((1 - muse.price / muse.compareAt) * 100)
    : 0;

  return (
    <section id="offer" className="px-6 py-16 lg:px-10 lg:py-24">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-paper">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-blob bg-clay/30 blur-2xl" />
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src={muse.image}
                alt={muse.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-clay px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.24em]">
                Deal of the week · −{off}%
              </span>
              <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                The {muse.title}
              </h2>
              <p className="mt-3 max-w-sm text-paper/70">{muse.blurb}</p>

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-5xl text-clay">€{muse.price}</span>
                {muse.compareAt && (
                  <span className="mb-1.5 text-xl text-paper/40 line-through">
                    €{muse.compareAt}
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2">
                {[
                  { v: t.h, l: "hrs" },
                  { v: t.m, l: "min" },
                  { v: t.s, l: "sec" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-paper/10 font-display text-2xl tabular-nums backdrop-blur">
                      {pad(b.v)}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-paper/50">
                      {b.l}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={productUrl(muse.slug)}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm tracking-wide text-ink transition-all duration-300 hover:bg-clay hover:text-paper"
              >
                Grab the deal
                <span aria-hidden>→</span>
              </a>
              <p className="mt-3 text-xs text-paper/50">
                ✿ Free shipping over €50 · ships in 1–2 days
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
