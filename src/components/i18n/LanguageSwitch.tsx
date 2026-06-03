"use client";

import { useT } from "./LocaleContext";
import { locales, localeLabels } from "@/data/i18n";

export default function LanguageSwitch() {
  const { locale, setLocale } = useT();
  return (
    <div className="flex items-center rounded-full border border-ink/15 bg-paper/50 p-0.5 backdrop-blur">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-label={`Switch to ${localeLabels[l]}`}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 text-[0.7rem] tracking-wide transition-colors ${
            locale === l ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
