import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PolicyContent from "@/components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — Madessa",
  description: "How Madessa collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy">
      <PolicyContent file="privacy.md" />
    </PageShell>
  );
}
