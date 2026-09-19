import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectRow } from "@/components/work/ProjectRow";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four production products: e-commerce and retail operations, a gold and jewelry ERP, an enterprise healthcare platform, and an AI internship simulation.",
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
        lead="Four products taken from the business problem through to production. Each case study says what was genuinely hard about it, and what the alternative would have cost."
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
    </Section>
  );
}
