import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

/**
 * Wraps any frame with its caption and disclosures.
 *
 * `sampleData` and `rtl` are surfaced as visible flags rather than buried in
 * prose: a business screenshot should say on its face whether the numbers are
 * seeded, and an Arabic screen should say it is an RTL interface.
 */
export function Figure({
  caption,
  number,
  sampleData = false,
  rtl = false,
  tone = "paper",
  className,
  children,
  // Reveal attributes (and anything else a <figure> takes) pass through, so a
  // gallery can cascade its figures.
  ...rest
}: {
  caption?: React.ReactNode;
  number?: string;
  sampleData?: boolean;
  rtl?: boolean;
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"figure">, "children">) {
  const hasFlags = sampleData || rtl;

  return (
    // min-w-0 is load-bearing. A figure is usually a grid or flex item, and
    // such an item's automatic minimum size is its content's minimum — which
    // the browser-frame URL sets, because `truncate` makes it nowrap. Without
    // this, one long URL widened its grid track past the page and gave the
    // whole phone a horizontal scroll. Measured: the track was 449px inside a
    // 350px container until this was set.
    <figure {...rest} className={cn("w-full min-w-0", className)}>
      {children}
      {(caption || hasFlags) && (
        <figcaption
          className={cn(
            "mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-small",
            tone === "band" ? "text-band-muted" : "text-ink-3",
          )}
        >
          {number ? (
            <span className="font-mono text-meta uppercase">Fig. {number}</span>
          ) : null}
          {caption ? <span className="max-w-prose">{caption}</span> : null}
          {rtl ? (
            <Badge variant="neutral" tone={tone}>
              Arabic interface (RTL)
            </Badge>
          ) : null}
          {sampleData ? (
            <Badge variant="note" tone={tone}>
              Sample data
            </Badge>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
