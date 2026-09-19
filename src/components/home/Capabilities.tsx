import Link from "next/link";
import { capabilities } from "@content/capabilities";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Twin } from "@/components/ui/Twin";
import { getProject } from "@/lib/content";

/**
 * Capability tied to proof. Every category links to the shipped product that
 * demonstrates it, so this cannot become a list of things I would like to do.
 */
export function Capabilities() {
  return (
    <Section id="what-i-build">
      <SectionHeader
        index="01"
        label={lexicon.whatIBuild}
        title="Systems businesses actually run on"
        lead="Four kinds of product, each with something shipped behind it."
      />

      <ul className="grid gap-px overflow-hidden rounded-figure border border-rule bg-rule md:grid-cols-2">
        {capabilities.map((capability) => {
          const proof = getProject(capability.proof);

          return (
            <li key={capability.label.en} className="bg-paper-raised p-8">
              <h3 className="text-h3">
                <Twin label={capability.label} />
              </h3>
              <p className="mt-4 text-body text-ink-2">{capability.body}</p>
              {proof ? (
                <p className="mt-6 font-mono text-meta uppercase text-ink-3">
                  Proof:{" "}
                  <Link
                    href={`/work/${proof.slug}`}
                    className="text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    {proof.title}
                  </Link>
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
