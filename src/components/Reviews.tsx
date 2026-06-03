"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import { reviews, stats } from "@/data/reviews";

export default function Reviews() {
  const [i, setI] = useState(0);
  const go = (dir: number) =>
    setI((prev) => (prev + dir + reviews.length) % reviews.length);
  const r = reviews[i];

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink px-6 py-20 text-paper lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 animate-blob bg-sage/20 blur-3xl" />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            Real people, real feedback
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Loved by families everywhere
          </h2>
        </Reveal>

        <div className="relative mt-12 min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-5 text-clay" aria-label={`${r.rating} out of 5`}>
                {"★".repeat(r.rating)}
              </div>
              <p className="mx-auto max-w-2xl font-display text-2xl leading-snug sm:text-[1.9rem]">
                “{r.quote}”
              </p>
              <footer className="mt-7">
                <p className="font-medium">{r.name}</p>
                <p className="text-sm text-paper/50">{r.detail}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 transition-colors hover:border-clay hover:text-clay"
          >
            ←
          </button>
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Review ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === i ? "w-7 bg-clay" : "w-1.5 bg-paper/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/20 transition-colors hover:border-clay hover:text-clay"
          >
            →
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 border-t border-paper/10 pt-12 sm:grid-cols-4">
        {stats.map((s, idx) => (
          <Reveal key={s.label} delay={idx * 0.08} className="text-center">
            <p className="font-display text-4xl text-clay">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-paper/50">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
