import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ — Madessa",
  description:
    "Frequently asked questions about Madessa: sizing, fabrics, care, shipping, and gifting.",
};

const faqs = [
  {
    q: "What fabrics do you use?",
    a: "Natural, baby-friendly fabrics — mostly soft 100% cotton, breathable muslin, and gentle knits. We choose materials that feel good on delicate skin and hold up wash after wash.",
  },
  {
    q: "How does sizing work?",
    a: "Most pieces run from baby sizes up to around 4Y. Each product page lists its size range. If you’re between sizes, we generally suggest sizing up so it grows with them.",
  },
  {
    q: "How should I care for the pieces?",
    a: "Cold gentle machine wash, inside out, and lay flat or low tumble to dry. Avoid bleach. The tulle and knits especially love a gentle cycle.",
  },
  {
    q: "Are the bows safe and secure?",
    a: "Yes — our bows are real and structured, sewn in rather than glued on, so they survive plenty of twirling and washing.",
  },
  {
    q: "Do you ship internationally?",
    a: "We do — worldwide. Free shipping within the Netherlands over €50, with EU and international delivery calculated at checkout. See our Shipping & Returns page for timings.",
  },
  {
    q: "Can I order a gift?",
    a: "Absolutely. Our sets make lovely baby-shower and birthday gifts, and everything arrives beautifully wrapped from our hands to yours.",
  },
];

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="Help"
      title="Questions & answers"
      intro="Everything you might want to know before your little one’s next favourite outfit arrives."
    >
      <div className="divide-y divide-ink/10">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                {f.q}
                <span className="text-clay transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 rounded-3xl bg-cream p-8 text-center">
        <p className="font-display text-2xl">Still wondering something?</p>
        <p className="mt-2 text-ink-soft">We’re a small family and we read every message.</p>
        <a
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm tracking-wide text-paper transition-colors hover:bg-clay"
        >
          Get in touch →
        </a>
      </Reveal>
    </PageShell>
  );
}
