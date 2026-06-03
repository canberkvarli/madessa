"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot tripped
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-cream p-10 text-center"
      >
        <span className="font-display text-5xl text-clay">✿</span>
        <p className="mt-4 font-display text-2xl">Thank you for writing</p>
        <p className="mt-2 text-ink-soft">
          We&apos;re a small family and we read every message. You&apos;ll hear
          back from us soon.
        </p>
      </motion.div>
    );
  }

  const field =
    "w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-ink outline-none transition-all placeholder:text-ink/40 focus:border-clay focus:ring-4 focus:ring-clay/10";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
      {status === "error" && (
        <p className="text-sm text-clay-deep">
          Something went wrong. Please email us directly instead.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
