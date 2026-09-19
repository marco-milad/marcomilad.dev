import type { Project } from "@content/schema";
import { stack } from "@content/stack";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { Twin } from "@/components/ui/Twin";
import { ProjectImage } from "./ProjectImage";

const PLATFORM_LABEL: Record<string, string> = {
  web: "Web",
  admin: "Admin",
  ios: "iOS",
  android: "Android",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  production: "In production",
  delivered: "Delivered",
  "in-progress": "In progress",
};

/** Title, positioning, the cover, and the fact sheet under it. */
export function CaseHero({ project }: { project: Project }) {
  const facts: Array<{ term: string; value: React.ReactNode }> = [
    { term: "Role", value: project.role },
    {
      term: "Type",
      value: <Twin label={project.category} />,
    },
    {
      term: "Platforms",
      value: project.platforms
        .map((platform) => PLATFORM_LABEL[platform] ?? platform)
        .join(" · "),
    },
    {
      term: "Languages",
      value: project.languages.map((l) => l.toUpperCase()).join(" · "),
    },
    { term: "Year", value: project.year },
    ...(project.duration
      ? [{ term: "Duration", value: project.duration }]
      : []),
    { term: "Status", value: STATUS_LABEL[project.status] },
    {
      term: "Stack",
      value: project.stack.map((id) => stack[id].name).join(" · "),
    },
    ...(project.links?.live
      ? [
          {
            term: "Live",
            value: (
              <TextLink href={project.links.live} external>
                {project.links.live.replace(/^https?:\/\//, "")}
              </TextLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <section className="pt-block pb-section">
      <Container>
        <p className="font-mono text-meta uppercase text-ink-3">
          <Twin label={project.category} />
        </p>

        <h1 className="mt-5 text-display">{project.title}</h1>
        <p className="mt-5 max-w-prose text-lead text-ink-2">
          {project.positioning}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.status === "production" ? (
            <Badge variant="status">{STATUS_LABEL[project.status]}</Badge>
          ) : (
            <Badge>{STATUS_LABEL[project.status]}</Badge>
          )}
          {project.confidentiality !== "public" ? (
            <Badge variant="note">Client work · shown with permission</Badge>
          ) : null}
        </div>

        <div className="mt-block">
          <ProjectImage
            asset={project.cover}
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
          />
        </div>

        <dl className="mt-block grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.term} className="border-t border-rule pt-4">
              <dt className="font-mono text-meta uppercase text-ink-3">
                {fact.term}
              </dt>
              <dd className="mt-2 text-body">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
