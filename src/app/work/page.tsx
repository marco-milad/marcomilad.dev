import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lexicon } from "@content/lexicon";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Twin } from "@/components/ui/Twin";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Four production products: e-commerce and retail operations, a gold and jewelry ERP, an enterprise healthcare platform, and an AI internship simulation.",
};

/**
 * Interim index — enough to exercise the content layer end to end.
 * The editorial project rows land in Phase 7.
 */
export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Section>
      <SectionHeader
        label={lexicon.selectedWork}
        level={1}
        title="Selected work"
        lead="Four products, built end to end."
      />

      <ul className="flex flex-col gap-block">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="group block">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="rounded-figure border border-rule"
                placeholder="blur"
              />
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-h2">{project.title}</h2>
                <p className="font-mono text-meta uppercase text-ink-3">
                  <Twin label={project.category} />
                </p>
              </div>
              <p className="mt-3 max-w-prose text-lead text-ink-2">
                {project.positioning}
              </p>
              <p className="mt-4 max-w-prose text-body text-ink-2">
                {project.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {project.status === "production" ? (
                  <Badge variant="status">In production</Badge>
                ) : null}
                <Badge>{project.platforms.join(" · ")}</Badge>
                <Badge>{project.languages.join(" · ").toUpperCase()}</Badge>
                <span className="font-mono text-meta uppercase text-ink-3">
                  {project.year}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
