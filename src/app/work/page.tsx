import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectRow } from "@/components/work/ProjectRow";
import { getAllProjects, getPortfolioStats } from "@/lib/content";
import { countWord } from "@/lib/numbers";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production work: e-commerce and retail operations, a gold and jewelry ERP, an enterprise healthcare platform, an AI internship simulation, and a media-heavy studio site.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const projects = getAllProjects();
  const stats = getPortfolioStats();

  return (
    <>
      <PageHero
        // Derived, so a sixth project changes the line without anyone
        // remembering to.
        facts={[
          "Work",
          stats.ongoing
            ? `${stats.firstYear} to now`
            : `${stats.firstYear}–${stats.lastYear}`,
          `${countWord(stats.inProduction, true)} in production`,
        ]}
        title="Selected work"
        arabic={lexicon.work}
        lead={`${countWord(projects.length, true)} products taken from the business problem through to production. Each case study says what was genuinely hard about it, and what the alternative would have cost.`}
      />

      <Section flush>
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
    </>
  );
}
