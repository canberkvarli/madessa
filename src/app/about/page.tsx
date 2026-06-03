import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story — Madessa",
  description:
    "Madessa is a small family making handmade clothing for little ones and mamas. Natural fabrics, careful details, built to be loved and passed down.",
};

const values = [
  {
    title: "Careful design",
    body: "Everything we do starts with why. Every seam, every bow, every fabric is considered, never rushed.",
  },
  {
    title: "Made with care",
    body: "We believe in building better and sustainable. Natural fabrics, small batches, pieces made to last.",
  },
  {
    title: "A family with a goal",
    body: "Real people making real products. Madessa is made by a family, for yours.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Our story"
      title="It started with a dress"
      intro="“When I was little I had this birthday dress. Purple, with bows. I never forgot how it made me feel.” Madessa began in a home, with a family who wanted to make pieces that hold that same kind of memory."
    >
      <Reveal className="relative mt-2 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-ink/10">
        <Image
          src="https://cdn.shopify.com/s/files/1/0918/7780/2358/files/9AE826E0-F7F1-4638-9319-5749E2460641.png?v=1778184439&width=3840"
          alt="A little one in a handmade Madessa dress"
          fill
          sizes="(max-width: 768px) 90vw, 768px"
          className="object-cover object-[50%_30%]"
        />
      </Reveal>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-soft">
        <p>
          We still cut, stitch and finish in small batches. Soft cotton so she
          can move freely. Voluminous tulle that survives the spins. Real,
          structured bows, never glued. Each piece is wrapped with love and sent
          from our hands to yours.
        </p>
        <p>
          What began as one dress has grown into little wardrobes for thousands
          of families, and clothing for the mamas who carry them. We make things
          we would want for our own children, and nothing we wouldn&apos;t.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.1} className="bg-paper p-7">
            <span className="font-display text-3xl text-clay/30">0{i + 1}</span>
            <h2 className="mt-3 font-display text-xl">{v.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
          </Reveal>
        ))}
      </div>

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
