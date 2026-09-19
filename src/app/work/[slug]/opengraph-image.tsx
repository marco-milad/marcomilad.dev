import { ImageResponse } from "next/og";
import { site } from "@content/site";
import { getAllProjects, getProject } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Marco Milad";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

const PLATFORM_LABEL: Record<string, string> = {
  web: "Web",
  admin: "Admin",
  ios: "iOS",
  android: "Android",
};

/**
 * Per-case-study share card. English only on purpose: Satori, which renders
 * these, does not shape Arabic reliably — a card is the wrong place to find
 * that out.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? site.name;
  const positioning = project?.positioning ?? site.role;
  const year = project?.year ?? "";
  const platforms =
    project?.platforms
      .map((platform) => PLATFORM_LABEL[platform] ?? platform)
      .join(" · ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f5f2ec",
          color: "#161513",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6f6c65",
            }}
          >
            Case study
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 600,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#4a4843",
              maxWidth: 900,
            }}
          >
            {positioning}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 4,
              backgroundColor: "#b3432b",
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              color: "#4a4843",
            }}
          >
            <div style={{ display: "flex" }}>
              {site.displayName} — {site.role}
            </div>
            <div style={{ display: "flex", color: "#6f6c65" }}>
              {[platforms, year].filter(Boolean).join("  ·  ")}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
