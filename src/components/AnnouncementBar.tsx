"use client";

import { useT } from "./i18n/LocaleContext";

export default function AnnouncementBar() {
  const { t } = useT();
  const base = [t("announce.1"), t("announce.2"), t("announce.3")];
  const items = [...base, ...base];
  return (
    <div className="bg-clay text-ink overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2.5">
        {items.map((text, i) => (
          <span
            key={i}
            className="mx-8 text-[0.72rem] uppercase tracking-[0.32em] font-semibold"
          >
            ✿&nbsp;&nbsp;{text}
          </span>
        ))}
      </div>
    </div>
  );
}
