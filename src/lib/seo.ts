import type { Project } from "@content/schema";
import { site } from "@content/site";
import { stack } from "@content/stack";
import { getAllProjects } from "./content";

/**
 * Structured data builders.
 *
 * English only, with one deliberate exception: Person.alternateName carries
 * the Arabic name, which is a legitimate use — it helps someone searching
 * "ماركو ميلاد" find this site, and it is a real alternate name rather than
 * decoration.
 */

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Technologies actually shipped, plus the domains they were shipped in. */
function knowsAbout(): string[] {
  const projects = getAllProjects();
  const technologies = new Set<string>();

  for (const project of projects) {
    for (const id of project.stack) technologies.add(stack[id].name);
  }

  return [
    "Product engineering",
    "Full-stack development",
    "Right-to-left and Arabic localization",
    ...[...technologies].sort(),
  ];
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: site.name,
    alternateName: site.nameAr.text,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    knowsAbout: knowsAbout(),
    sameAs: [site.links.linkedin, site.links.github],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: `${site.name} — ${site.role}`,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#person") },
  };
}

export function articleJsonLd(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: project.seo.title,
    description: project.seo.description,
    url,
    datePublished: project.updatedAt,
    dateModified: project.updatedAt,
    inLanguage: "en",
    author: { "@id": absoluteUrl("/#person") },
    publisher: { "@id": absoluteUrl("/#person") },
    about: project.title,
    keywords: project.stack.map((id) => stack[id].name).join(", "),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
