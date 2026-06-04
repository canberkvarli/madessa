"use client";

import Reveal from "./Reveal";
import { useT } from "./i18n/LocaleContext";

const items = [
  {
    key: "trust.1",
    icon: <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" />,
  },
  {
    key: "trust.2",
    icon: <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
  },
  {
    key: "trust.3",
    icon: <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 17a2 2 0 104 0 2 2 0 10-4 0M16 17a2 2 0 104 0 2 2 0 10-4 0" />,
  },
  {
    key: "trust.4",
    icon: <path d="M3 12a9 9 0 109-9M3 12V6m0 6h6" />,
  },
  {
    key: "trust.5",
    icon: <path d="M6 10V8a6 6 0 1112 0v2M5 10h14v10H5z" />,
  },
];

export default function TrustBand() {
  const { t } = useT();
  return (
    <section className="bg-cream px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-clay">
            {t("trust.heading")}
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((it, i) => (
            <Reveal key={it.key} delay={i * 0.07} className="flex flex-col items-center text-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9 text-clay"
              >
                {it.icon}
              </svg>
              <p className="mt-4 text-sm leading-snug text-ink">{t(it.key)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
