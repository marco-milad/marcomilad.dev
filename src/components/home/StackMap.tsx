import Link from "next/link";
import { lexicon } from "@content/lexicon";
import type { StackGroup } from "@content/stack";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getStackUsage } from "@/lib/content";

const GROUP_LABEL: Record<StackGroup, string> = {
  frontend: "Frontend",
  backend: "Backend & data",
  mobile: "Mobile",
  delivery: "Delivery",
};

const GROUP_ORDER: StackGroup[] = ["frontend", "backend", "mobile", "delivery"];

/**
 * Technologies mapped to the products they were used in — derived from the
 * case-study data. No proficiency bars, no percentages: the claim is "this
 * shipped", and the projects are the evidence.
 */
export function StackMap() {
  const usage = getStackUsage();

  return (
    <Section id="stack">
      <SectionHeader
        index="04"
        label={lexicon.stack}
        title="Used in production, not just tried"
        lead="Each tool listed with the products it actually shipped in."
      />

      <div className="flex flex-col gap-block">
        {GROUP_ORDER.map((group) => {
          const items = usage
            .filter((item) => item.group === group)
            .sort((a, b) => b.projects.length - a.projects.length);

          if (items.length === 0) return null;

          return (
            <div key={group}>
              <h3 className="font-mono text-meta uppercase text-ink-3">
                {GROUP_LABEL[group]}
              </h3>

              <dl className="mt-4 flex flex-col">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule py-4"
                  >
                    <dt className="text-h3">{item.name}</dt>
                    <dd className="flex flex-wrap gap-x-4 gap-y-1 text-small text-ink-3">
                      {item.projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/work/${project.slug}`}
                          className="underline decoration-1 underline-offset-4 hover:text-ink-2 hover:decoration-2"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
