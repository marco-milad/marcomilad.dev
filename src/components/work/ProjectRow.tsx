import Image from "next/image";
import Link from "next/link";
import type { Project } from "@content/schema";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { Badge } from "@/components/ui/Badge";
import { Twin } from "@/components/ui/Twin";

const PLATFORM_LABEL: Record<string, string> = {
  web: "Web",
  admin: "Admin",
  ios: "iOS",
  android: "Android",
};

/**
 * An editorial work row: cover on one side, the story on the other, sides
 * alternating down the page. On a phone it is image-first and stacked, and
 * the whole row is one link.
 */
export function ProjectRow({
  project,
  index,
  priority = false,
  headingLevel = 3,
}: {
  project: Project;
  index: number;
  priority?: boolean;
  /** h2 on /work, where rows sit under the page h1; h3 under a section h2. */
  headingLevel?: 2 | 3;
}) {
  const flip = index % 2 === 1;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-t-2 pt-8 transition-colors duration-base ease-editorial"
      // A row arrives as one piece. Rows sit a whole section apart, so they
      // each get their own trigger rather than a shared cascade — a stagger
      // between them would only be lag.
      {...reveal(0, {
        // The row is topped by the product's own colour, so Work reads as five
        // distinct things rather than one template repeated.
        style: { borderColor: project.brand },
        // The priority row carries the cover that can be LCP on /work, so it
        // rises opaque instead of fading out of the measurement.
        fade: priority ? false : undefined,
      })}
    >
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div
          className={cn(
            "lg:col-span-7",
            flip ? "lg:order-2" : "lg:order-1",
          )}
        >
          <div className="overflow-hidden rounded-figure border border-rule">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              sizes="(min-width: 1024px) 60vw, 100vw"
              placeholder="blur"
              priority={priority}
              className="h-auto w-full transition-transform duration-400 ease-editorial group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div
          className={cn(
            "lg:col-span-5",
            flip ? "lg:order-1" : "lg:order-2",
          )}
        >
          <p
            className="font-mono text-meta uppercase"
            style={{
              color: `color-mix(in srgb, ${project.brand} 72%, var(--color-ink))`,
            }}
          >
            <Twin label={project.category} />
          </p>

          <Heading className="mt-4 text-h2 transition-colors duration-base ease-editorial group-hover:text-accent-text">
            {project.title}
          </Heading>

          <p className="mt-3 text-lead text-ink-2">{project.positioning}</p>

          <p className="mt-4 max-w-prose text-body text-ink-2">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.status === "production" ? (
              <Badge variant="status">In production</Badge>
            ) : null}
            <Badge>
              {project.platforms
                .map((platform) => PLATFORM_LABEL[platform] ?? platform)
                .join(" · ")}
            </Badge>
            <Badge>
              {project.languages.map((l) => l.toUpperCase()).join(" · ")}
            </Badge>
          </div>

          <p className="mt-6 text-small text-accent-text underline decoration-1 underline-offset-4 group-hover:decoration-2">
            Read the case study
            <span
              aria-hidden="true"
              className="ms-1 inline-block transition-transform duration-base ease-editorial group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
