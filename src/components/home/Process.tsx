import Link from "next/link";
import { lexicon, verbChain } from "@content/lexicon";
import { processStages } from "@content/process";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Ar } from "@/components/ui/Ar";
import { getProject } from "@/lib/content";
import { reveal } from "@/lib/reveal";

/**
 * The verb chain expanded, on the ink band. Each stage cites one real artifact
 * and links to the case study it came from — the process is shown, not claimed.
 */
export function Process() {
  return (
    <Section tone="band" id="process">
      <SectionHeader
        index="04"
        label={lexicon.process}
        tone="band"
        title="How the work actually goes"
        lead="Five stages, each pointing at something that exists rather than describing a method."
      />

      <ol className="flex flex-col">
        {processStages.map((stage, index) => {
          const verb = verbChain.find((v) => v.key === stage.key);
          const project = getProject(stage.artifact.project);
          if (!verb) return null;

          return (
            <li
              key={stage.key}
              className="grid gap-4 border-t border-band-rule py-8 lg:grid-cols-12 lg:gap-8"
              {...reveal(index, { shift: 14 })}
            >
              <div className="lg:col-span-3">
                <p className="font-mono text-meta text-band-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-h3">{verb.en}</h3>
                <Ar
                  decorative
                  className="ar-display mt-1 inline-block text-h3 text-accent-on-band"
                >
                  {verb.ar.text}
                </Ar>
              </div>

              <p className="text-body text-band-fg lg:col-span-4">
                {stage.body}
              </p>

              <div className="lg:col-span-5">
                <p className="font-mono text-meta uppercase text-band-muted">
                  From the work
                </p>
                <p className="mt-2 text-body text-band-fg">
                  {stage.artifact.text}
                </p>
                {project ? (
                  <Link
                    href={`/work/${project.slug}`}
                    // inline-flex keeps the arrow beside the last word instead
                    // of letting it wrap onto a line of its own.
                    className="group mt-3 inline-flex items-baseline gap-1 text-small text-accent-on-band underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    <span>{project.title}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-base ease-editorial group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
