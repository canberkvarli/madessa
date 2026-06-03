import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shipping & Returns — Madessa",
  description:
    "Madessa shipping times and returns. Free shipping within the Netherlands over €50. Worldwide delivery with tracking.",
};

// Shipping details are the store's real policy. Returns terms below are a
// sensible default — TODO(Yaren): confirm the exact returns window/terms.
const shipping = [
  {
    region: "Netherlands",
    time: "1–2 business days",
    note: "Free shipping on orders over €50.",
  },
  {
    region: "EU (Belgium, Germany, France…)",
    time: "3–7 business days",
    note: "Shipping calculated at checkout.",
  },
  {
    region: "International (UK, US, Australia…)",
    time: "7–14 business days",
    note: "Calculated at checkout. Customs/import duties may apply and are the customer’s responsibility.",
  },
];

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Help"
      title="Shipping & Returns"
      intro="Every order is wrapped with care. Here’s how and when it reaches you."
    >
      <Reveal>
        <h2 className="font-display text-2xl">Processing</h2>
        <p className="mt-2 text-ink-soft">
          All orders are processed within 1–2 business days. During busy periods
          this may take a little longer — we appreciate your patience. 🤍
        </p>
      </Reveal>

      <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10">
        {shipping.map((s, i) => (
          <Reveal
            key={s.region}
            delay={i * 0.08}
            className={`flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:justify-between ${
              i > 0 ? "border-t border-ink/10" : ""
            }`}
          >
            <div>
              <p className="font-display text-lg">{s.region}</p>
              <p className="text-sm text-ink-soft">{s.note}</p>
            </div>
            <span className="shrink-0 rounded-full bg-cream px-4 py-1.5 text-sm tracking-wide">
              {s.time}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <h2 className="font-display text-2xl">Tracking</h2>
        <p className="mt-2 text-ink-soft">
          Once your order ships you’ll get a confirmation email with your
          tracking number, so you can follow it all the way to your door.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <h2 className="font-display text-2xl">Returns</h2>
        <p className="mt-2 text-ink-soft">
          We want you and your little one to love every piece. If something
          isn’t right, reach out within 14 days of delivery and we’ll help with
          a return or exchange of unworn items with tags attached. Drop us a
          note any time at{" "}
          <a href="/contact" className="text-clay underline-offset-4 hover:underline">
            our contact page
          </a>
          .
        </p>
      </Reveal>
    </PageShell>
  );
}
