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
      <span>{site.displayName}</span>
      <span aria-hidden="true" className="mx-2 text-ink-3">
        ·
      </span>
      <Ar
        decorative={site.nameAr.decorative}
        className={cn("ar-display", tone === "band" && "text-band-fg")}
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
    <Link href="/" className={cn(classes, "inline-flex items-baseline")}>
      {content}
    </Link>
  );
}
