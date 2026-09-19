import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getAllProjects } from "@/lib/content";

/**
 * Generated from the project registry, so it cannot drift from the routes.
 * Case-study dates come from the content's own updatedAt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projects: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projects];
}
