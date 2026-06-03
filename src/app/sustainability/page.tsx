import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Materials & Care — Madessa",
  description:
    "Natural fabrics, gentle on delicate skin, made in small batches to be loved and passed down. How Madessa makes better, more sustainable clothing.",
};

const G = "https://cdn.shopify.com/s/files/1/0918/7780/2358/files/";

const pillars = [
  {
    title: "Natural fabrics",
    body: "Soft 100% cotton, breathable muslin and gentle knits — chosen to feel good on the most delicate skin.",
  },
  {
    title: "Small batches",
    body: "We make in small runs rather than mass production, so there's less waste and more care in every piece.",
  },
  {
    title: "Made to last",
    body: "Real, sewn-in details and sturdy construction mean our clothes are made to be handed down, not thrown away.",
  },
];

export default function SustainabilityPage() {
  return (
    <PageShell
      eyebrow="Made with care"
      title="Better, gentler, made to last"
      intro="We believe in building better and more sustainable. Natural fabrics, small batches, and pieces made to be passed down."
    >
      <Reveal className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-ink/10">
        <Image
          src={`${G}MD_2228.jpg?width=1600`}
          alt="Soft muslin pieces by Madessa"
          fill
          sizes="(max-width: 768px) 90vw, 768px"
          className="object-cover"
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} className="bg-paper p-7">
            <span className="font-display text-3xl text-clay/30">0{i + 1}</span>
            <h2 className="mt-3 font-display text-xl">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 space-y-4 text-lg leading-relaxed text-ink-soft">
        <h2 className="font-display text-2xl text-ink">Caring for your pieces</h2>
        <p>
          A little care keeps them lovely for the next little one. Cold gentle
          machine wash inside out, lay flat or tumble low, and skip the bleach.
          The tulle and knits especially love a soft cycle.
        </p>
        <p>
          When they&apos;ve been outgrown, we hope they&apos;re passed to another
          family, the way the best things always are.
        </p>
      </Reveal>

      <Reveal className="mt-12 text-center">
        <a
          href="/#shop"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-paper transition-all duration-300 hover:bg-clay hover:scale-[1.03]"
        >
          Explore the collection →
        </a>
      </Reveal>
    </PageShell>
  );
}
