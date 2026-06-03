"use client";

import Reveal from "./Reveal";
import { useT } from "./i18n/LocaleContext";

const icons = [
  <path key="i" d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" />,
  <path key="i" d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  <g key="i">
    <circle cx="9" cy="8" r="3" />
    <circle cx="16" cy="10" r="2.2" />
    <path d="M4 20c0-3 2.5-5 5-5s5 2 5 5M14 20c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" />
  </g>,
];

export default function ValuePillars() {
  const { t } = useT();
  const [pre, post] = t("pillars.headingTemplate").split("{0}");
  const pillars = [1, 2, 3].map((n, i) => ({
    k: `0${n}`,
    title: t(`pillars.${n}t`),
    body: t(`pillars.${n}b`),
    icon: icons[i],
  }));

  return (
    <section className="relative bg-cream px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            {t("pillars.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            {pre}
            <span className="italic text-clay">{t("pillars.headingEmph")}</span>
            {post}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.12}
              className="group bg-cream p-8 transition-colors duration-500 hover:bg-paper sm:p-10"
            >
              <div className="flex items-center justify-between">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9 text-clay transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                >
                  {p.icon}
                </svg>
                <span className="font-display text-3xl text-ink/15">{p.k}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
