import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PolicyContent from "@/components/PolicyContent";

export const metadata: Metadata = {
  title: "Terms of Service — Madessa",
  description: "The terms and conditions for using the Madessa website and shop.",
};

export default function TermsPage() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Service">
      <PolicyContent file="terms.md" />
    </PageShell>
  );
}
