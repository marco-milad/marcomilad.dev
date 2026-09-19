import { projectRegistry } from "@content/projects";
import { SECTION_CHAPTER, projectSchema, type Project } from "@content/schema";
import { stack, type StackId } from "@content/stack";
import { verbChain, type ChapterKey } from "@content/lexicon";

/**
 * Loads and validates content once, at module load — which during a static
 * build means broken content fails the build rather than reaching a page.
 */
function loadProjects(): Project[] {
  const projects = projectRegistry.map((entry) => {
    const result = projectSchema.safeParse(entry);

    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n");
      throw new Error(
        `Invalid project content in "${entry.slug}":\n${details}`,
      );
    }

    return result.data;
  });

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: "${project.slug}"`);
    }
    slugs.add(project.slug);
  }

  return projects.sort((a, b) => a.order - b.order);
}

const projects = loadProjects();

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next/previous in display order, wrapping at the ends. */
export function getAdjacentProject(slug: string): Project | undefined {
  if (projects.length < 2) return undefined;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}

export type Chapter = {
  key: ChapterKey;
  en: string;
  ar: string;
  sections: Project["sections"];
};

/**
 * Groups a project's sections into the verb chain. Authors order sections;
 * the chapter each one belongs to is derived, so every case study reads with
 * the same arc even when sections are omitted.
 */
export function getChapters(project: Project): {
  intro: Project["sections"];
  chapters: Chapter[];
} {
  const intro = project.sections.filter(
    (section) => SECTION_CHAPTER[section.type] === "intro",
  );

  const chapters = verbChain
    .map((verb) => ({
      key: verb.key,
      en: verb.en,
      ar: verb.ar.text,
      sections: project.sections.filter(
        (section) => SECTION_CHAPTER[section.type] === verb.key,
      ),
    }))
    .filter((chapter) => chapter.sections.length > 0);

  return { intro, chapters };
}

/** Facts for the home proof strip — derived, never hand-maintained. */
export function getProofFacts(): string[] {
  const all = getAllProjects();
  const platforms = new Set(all.flatMap((project) => project.platforms));
  const languages = new Set(all.flatMap((project) => project.languages));
  const inProduction = all.filter(
    (project) => project.status === "production",
  ).length;

  const facts = [`${all.length} shipped products`];

  if (inProduction > 0) facts.push(`${inProduction} running in production`);

  const surfaces = [
    platforms.has("web") && "Web",
    platforms.has("ios") && "iOS",
    platforms.has("android") && "Android",
  ].filter(Boolean);
  if (surfaces.length > 0) facts.push(surfaces.join(" · "));

  if (languages.has("ar")) facts.push("Arabic RTL in production");

  return facts;
}

/** Technologies mapped to the projects that actually used them. */
export function getStackUsage(): Array<{
  id: StackId;
  name: string;
  group: string;
  projects: Array<{ slug: string; title: string }>;
}> {
  const usage = new Map<StackId, Array<{ slug: string; title: string }>>();

  for (const project of getAllProjects()) {
    for (const id of project.stack) {
      const list = usage.get(id) ?? [];
      list.push({ slug: project.slug, title: project.title });
      usage.set(id, list);
    }
  }

  return [...usage.entries()].map(([id, used]) => ({
    id,
    name: stack[id].name,
    group: stack[id].group,
    projects: used,
  }));
}
