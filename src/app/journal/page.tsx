import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Journal — Madessa",
  description:
    "Stories, styling and little moments from the Madessa family. An editorial look at handmade pieces made to be lived in.",
};

const G = "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/";

const entries = [
  {
    img: `${G}515595139_742684715115649_8159463199544968301_n.jpg?width=1200`,
    tag: "Lookbook",
    title: "The Little Muse, twirl-tested",
    excerpt: "Soft cotton, voluminous tulle, and a real bow that survives every spin.",
    wide: true,
  },
  {
    img: `${G}MD_0075.jpg?width=900`,
    tag: "Behind the seams",
    title: "Made in small batches",
    excerpt: "Why we cut and stitch by hand, in runs small enough to care about.",
  },
  {
    img: `${G}MD_2067.jpg?width=900`,
    tag: "For mama",
    title: "Pieces for the in-between",
    excerpt: "Nursing-friendly, bump-friendly, and made to feel like you.",
  },
  {
    img: `${G}MD_0878.jpg?width=900`,
    tag: "Tiny humans",
    title: "Room to crawl, climb, explore",
    excerpt: "One-piece freedom for first steps and everything after.",
  },
];

export default function JournalPage() {
  return (
    <PageShell
      eyebrow="The Journal"
      title="Little moments, made to last"
      intro="Stories, styling and the small things from our home to yours."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {entries.map((e, i) => (
          <Reveal
            key={e.title}
            delay={i * 0.08}
            className={e.wide ? "sm:col-span-2" : ""}
          >
            <article className="group cursor-default">
              <div className={`relative overflow-hidden rounded-3xl bg-cream ${e.wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={e.img}
                  alt={e.title}
                  fill
                  sizes={e.wide ? "(max-width: 768px) 90vw, 768px" : "(max-width: 768px) 90vw, 380px"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-clay">{e.tag}</p>
              <h2 className="mt-1 font-display text-2xl">{e.title}</h2>
              <p className="mt-1 text-ink-soft">{e.excerpt}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
