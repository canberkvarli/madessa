"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useT } from "./i18n/LocaleContext";

const KEY = "madessa-popup-seen-v1";

export default function NewsletterPopup() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    const timer = setTimeout(() => setOpen(true), 14000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setDone(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={dismiss} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-paper p-8 text-center shadow-2xl ring-1 ring-ink/10"
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-sm transition-colors hover:border-ink/40"
            >
              ✕
            </button>
            <span className="font-display text-5xl text-clay">✿</span>
            {done ? (
              <p className="mt-5 font-display text-2xl">{t("newsletter.done")}</p>
            ) : (
              <>
                <p className="mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-clay">
                  {t("newsletter.perk")}
                </p>
                <h2 className="mt-2 font-display text-3xl">{t("newsletter.heading")}</h2>
                <p className="mt-2 text-sm text-ink-soft">{t("newsletter.body")}</p>
                <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder")}
                    className="w-full rounded-full border border-ink/15 bg-paper px-5 py-3 text-ink outline-none transition-all placeholder:text-ink/40 focus:border-clay focus:ring-4 focus:ring-clay/10"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink py-3.5 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
                  >
                    {t("newsletter.button")}
                  </button>
                </form>
                <button onClick={dismiss} className="mt-3 text-xs text-ink-soft underline-offset-4 hover:underline">
                  No thanks
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
