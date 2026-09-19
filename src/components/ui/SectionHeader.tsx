import type { Label } from "@content/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import type { SectionTone } from "./Section";

/**
 * Eyebrow + heading + optional lead.
 *
 * `level` is required rather than hardcoded so heading order stays correct on
 * every page — accessibility enforced by the API, not by review.
 */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  level = 2,
  tone = "paper",
  className,
}: {
  index?: string;
  label: Label;
  title: React.ReactNode;
  lead?: React.ReactNode;
  level?: 1 | 2 | 3;
  tone?: SectionTone;
  className?: string;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  const titleSize =
    level === 1 ? "text-display" : level === 2 ? "text-h2" : "text-h3";

  return (
    <header className={cn("mb-block", className)}>
      <Eyebrow index={index} label={label} tone={tone} />
      <Heading className={cn("mt-5", titleSize)}>{title}</Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-prose text-lead",
            tone === "band" ? "text-band-muted" : "text-ink-2",
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
