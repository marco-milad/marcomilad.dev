import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectRow } from "@/components/work/ProjectRow";
import { getAllProjects } from "@/lib/content";
import { countWord } from "@/lib/numbers";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production work: e-commerce and retail operations, a gold and jewelry ERP, an enterprise healthcare platform, an AI internship simulation, and a media-heavy studio site.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Section>
      <SectionHeader
        label={lexicon.selectedWork}
        level={1}
        title="Selected work"
        lead={`${countWord(projects.length, true)} products taken from the business problem through to production. Each case study says what was genuinely hard about it, and what the alternative would have cost.`}
      />

      <div className="flex flex-col gap-section">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            priority={index === 0}
            headingLevel={2}
          />
        ))}
      </div>
    </Section>
  );
}
