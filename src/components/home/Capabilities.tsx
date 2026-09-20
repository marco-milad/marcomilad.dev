import Link from "next/link";
import { capabilities } from "@content/capabilities";
import { lexicon } from "@content/lexicon";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Twin } from "@/components/ui/Twin";
import { getProject } from "@/lib/content";
import { countWord } from "@/lib/numbers";

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
        lead={`${countWord(capabilities.length, true)} kinds of product, each with something shipped behind it.`}
      />

      {/* The plate enters as one piece and the cards slide into their slots.
          Fading the cards individually would leave the grid's own hairline
          background showing as a bare grey slab until the last one landed. */}
      <ul
        className="grid gap-px overflow-hidden rounded-figure border border-rule bg-rule md:grid-cols-2"
        {...reveal(0)}
      >
        {capabilities.map((capability, index) => {
          const proof = getProject(capability.proof);
          // An odd count would leave a hole in a two-column grid; the last
          // one spans instead.
          const spans =
            capabilities.length % 2 === 1 && index === capabilities.length - 1;

          return (
            <li
              key={capability.label.en}
              {...reveal(index + 1, { fade: false, shift: 8 })}
              className={cn(
                "group bg-paper-raised p-8 transition-colors duration-base ease-editorial hover:bg-paper-accent",
                spans && "md:col-span-2",
              )}
            >
              <h3 className="text-h3 transition-colors duration-base ease-editorial group-hover:text-accent-text">
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
