import type { MetadataRoute } from "next";
import { site } from "@content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Dev-only route; it 404s in production, but say so explicitly.
      disallow: "/specimen",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
