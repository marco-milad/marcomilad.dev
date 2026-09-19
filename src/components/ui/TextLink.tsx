import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Inline link. External targets get an arrow and an announced new-tab notice;
 * internal ones go through next/link so navigation stays client-side.
 */
export function TextLink({
  href,
  external = false,
  tone = "paper",
  className,
  children,
}: {
  href: string;
  external?: boolean;
  tone?: "paper" | "band";
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(
    "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-150 hover:decoration-2",
    tone === "band" ? "text-accent-on-band" : "text-accent-text",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span aria-hidden="true"> ↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
