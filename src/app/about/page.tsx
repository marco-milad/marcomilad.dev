import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marco Milad, product engineer in Cairo. Experience, how I work, and the stack behind the products.",
};

/** Placeholder — About plus the experience timeline arrive in Phase 7. */
export default function AboutPage() {
  return (
    <Section>
      <SectionHeader
        label={lexicon.about}
        level={1}
        title="About"
        lead="Story, experience and how I work — written in Phase 7."
      />
      <div id="experience" className="scroll-mt-24" />
    </Section>
  );
}
