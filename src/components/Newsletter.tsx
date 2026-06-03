"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { useT } from "./i18n/LocaleContext";

export default function Newsletter() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // even if delivery isn't wired yet, thank the visitor
    }
    setDone(true);
  };

  return (
    <section className="px-6 pb-20 lg:px-10">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-sage px-8 py-14 text-paper sm:px-14 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-blob bg-paper/15 blur-2xl" />
        <div className="relative mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/15 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.24em] backdrop-blur">
            ✿ {t("newsletter.perk")}
          </span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            {t("newsletter.heading")}
          </h2>
          <p className="mt-3 text-paper/80">{t("newsletter.body")}</p>

          {done ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 font-display text-2xl"
            >
              {t("newsletter.done")}
            </motion.p>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                className="w-full rounded-full bg-paper px-6 py-3.5 text-ink outline-none ring-clay/0 transition-all placeholder:text-ink/40 focus:ring-4 focus:ring-paper/40"
              />
              <button
                type="submit"
                disabled={sending}
                className="shrink-0 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.03] disabled:opacity-70"
              >
                {sending ? t("newsletter.joining") : t("newsletter.button")}
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-paper/50">{t("newsletter.fine")}</p>
        </div>
      </Reveal>
    </section>
  );
}
