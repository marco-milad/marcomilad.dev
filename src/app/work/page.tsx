import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four production products: e-commerce and retail operations, a gold and jewelry ERP, an enterprise healthcare platform, and an AI internship simulation.",
};

/** Placeholder — the real index lands in Phase 7, after the case studies. */
export default function WorkPage() {
  return (
    <Section>
      <SectionHeader
        label={lexicon.selectedWork}
        level={1}
        title="Selected work"
        lead="Four products, built end to end. The case-study system lands in Phase 4."
      />
    </Section>
  );
}
