import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Marco Milad — product engineering roles and selected client work.",
};

/** Placeholder — the two-path contact page and its form arrive in Phase 7. */
export default function ContactPage() {
  return (
    <Section>
      <SectionHeader
        label={lexicon.contact}
        level={1}
        title={lexicon.letsStart.en}
        lead="The full contact page, with a form, is built in Phase 7."
      />
      <p className="text-body text-ink-2">
        Meanwhile:{" "}
        <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
      </p>
    </Section>
  );
}
