import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PolicyContent from "@/components/PolicyContent";

export const metadata: Metadata = {
  title: "Returns & Refunds — Madessa",
  description:
    "Returns within 30 days, free return shipping, no restocking fee.",
};

export default function ReturnsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Returns & Refunds"
      intro="Return within 30 days · free return shipping · no restocking fee."
    >
      <PolicyContent file="returns.md" />
    </PageShell>
  );
}
