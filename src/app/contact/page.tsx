import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Madessa",
  description:
    "Get in touch with Madessa. Questions about sizing, orders, or gifting — we read every message.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Say hello"
      title="Get in touch"
      intro="Questions about sizing, an order, or a gift? We’re a small family and we read every message."
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-6">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-clay">Email</p>
            <a href={`mailto:${site.contact.email}`} className="mt-1 block font-display text-xl hover:text-clay">
              {site.contact.email}
            </a>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-clay">Instagram</p>
            <a href={site.socials.instagram} target="_blank" rel="noopener" className="mt-1 block font-display text-xl hover:text-clay">
              {site.socials.instagramHandle}
            </a>
          </div>
          <p className="text-sm text-ink-soft">{site.contact.location}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </PageShell>
  );
}
