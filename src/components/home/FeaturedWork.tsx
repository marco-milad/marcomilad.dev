import Link from "next/link";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectRow } from "@/components/work/ProjectRow";
import { getFeaturedProjects } from "@/lib/content";
import { countWord } from "@/lib/numbers";
import { reveal } from "@/lib/reveal";

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <Section id="work">
      <SectionHeader
        index="02"
        label={lexicon.selectedWork}
        title={`${countWord(projects.length, true)} products, built end to end`}
        lead="Each one taken from the business problem through to production — and each case study says what was hard about it."
      />

      <div className="flex flex-col gap-section">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            priority={index === 0}
          />
        ))}
      </div>

      <p className="mt-block" {...reveal()}>
        <Link
          href="/work"
          className="group text-small text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          All work
          <span
            aria-hidden="true"
            className="ms-1 inline-block transition-transform duration-base ease-editorial group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </p>
    </Section>
  );
}
