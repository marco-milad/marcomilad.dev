import type { Label } from "@content/types";
import { cn } from "@/lib/cn";
import { reveal, revealNow } from "@/lib/reveal";
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

  // An h1 is the top of its page by definition, so it is already on screen:
  // it enters on the load cadence rather than waiting for the observer, which
  // would mean the page's LCP text sat at opacity 0 until the bundle arrived.
  const enter = level === 1 ? revealNow : reveal;

  return (
    // Every section header on the site cascades the same way — marker, then
    // heading, then lead — so the rhythm is set in one place rather than
    // decided again per page.
    <header className={cn("mb-block", className)}>
      <Eyebrow index={index} label={label} tone={tone} {...enter(0, { shift: 10 })} />
      <Heading
        className={cn("mt-5", titleSize)}
        // A page h1 is a candidate for LCP, so it rises rather than fades.
        {...enter(level === 1 ? 0 : 1, level === 1 ? { fade: false, shift: 14 } : {})}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-prose text-lead",
            tone === "band" ? "text-band-muted" : "text-ink-2",
          )}
          {...enter(2)}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
