import Link from "next/link";
import { site } from "@content/site";
import { cn } from "@/lib/cn";
import { Ar } from "@/components/ui/Ar";

/**
 * "Eng. Marco Milad · ماركو ميلاد".
 *
 * The Arabic name is real information, not decoration, so it stays readable to
 * screen readers — with lang="ar" it is also pronounced correctly.
 */
export function Wordmark({
  asLink = true,
  tone = "paper",
  className,
}: {
  asLink?: boolean;
  tone?: "paper" | "band";
  className?: string;
}) {
  const content = (
    <>
      <span className="whitespace-nowrap">{site.displayName}</span>
      {/* The dot only exists when the pair is on one line. */}
      <span aria-hidden="true" className="mx-2 hidden text-ink-3 sm:inline">
        ·
      </span>
      {/* The Arabic used to disappear below sm, because side by side it wrapped
          the wordmark onto two lines. It is stacked underneath there instead —
          the phone is where most of the people this name is for will read it,
          and it should not be the one screen that drops it. */}
      <Ar
        decorative={site.nameAr.decorative}
        className={cn(
          "ar-display block text-[0.85em] text-ink-3 sm:inline sm:text-[1em]",
          tone === "band" ? "text-band-muted sm:text-band-fg" : "sm:text-ink",
        )}
      >
        {site.nameAr.text}
      </Ar>
    </>
  );

  const classes = cn("font-medium tracking-tight", className);

  if (!asLink) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link
      href="/"
      className={cn(
        classes,
        "inline-flex flex-col items-start leading-tight sm:flex-row sm:items-baseline",
      )}
    >
      {content}
    </Link>
  );
}
