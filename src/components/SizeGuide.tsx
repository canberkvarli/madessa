"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const rows = [
  { size: "0–3m", height: "50–62 cm", weight: "3–6 kg" },
  { size: "3–6m", height: "62–68 cm", weight: "6–8 kg" },
  { size: "6–12m", height: "68–80 cm", weight: "8–10 kg" },
  { size: "1Y", height: "80–86 cm", weight: "10–12 kg" },
  { size: "2Y", height: "86–98 cm", weight: "12–14 kg" },
  { size: "3Y", height: "98–104 cm", weight: "14–16 kg" },
  { size: "4Y", height: "104–110 cm", weight: "16–18 kg" },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("madessa:open-sizeguide", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("madessa:open-sizeguide", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-paper p-7 shadow-2xl ring-1 ring-ink/10 sm:p-9"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
            >
              ✕
            </button>
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">Find the fit</p>
            <h2 className="mt-2 font-display text-3xl">Size guide</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Sizes run by age, but height is the best guide. Between sizes? We
              suggest sizing up so it grows with them.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
              <div className="grid grid-cols-3 bg-cream text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                <span className="px-4 py-3">Size</span>
                <span className="px-4 py-3">Height</span>
                <span className="px-4 py-3">Weight</span>
              </div>
              {rows.map((r, i) => (
                <div
                  key={r.size}
                  className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-paper" : "bg-cream/40"}`}
                >
                  <span className="px-4 py-2.5 font-display text-base">{r.size}</span>
                  <span className="px-4 py-2.5 text-ink-soft">{r.height}</span>
                  <span className="px-4 py-2.5 text-ink-soft">{r.weight}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              Measurements are approximate. Each piece notes its own size range.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
