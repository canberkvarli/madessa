import { site } from "@/data/site";

export default function AnnouncementBar() {
  const items = [...site.offer.announcements, ...site.offer.announcements];
  return (
    <div className="bg-clay text-ink overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2.5">
        {items.map((text, i) => (
          <span
            key={i}
            className="mx-8 text-[0.72rem] uppercase tracking-[0.32em] font-semibold"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
