"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@content/site";
import { cn } from "@/lib/cn";
import { Ar } from "@/components/ui/Ar";

/**
 * Desktop navigation.
 *
 * The system rule: Arabic marks where you are. Labels are English; the current
 * section reveals its Arabic twin. That keeps Arabic purposeful instead of
 * decorative, and gives the active state a second, non-colour cue.
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-8">
        {primaryNav.map((item) => {
          const isActive =
            !item.external &&
            (pathname === item.href || pathname.startsWith(`${item.href}/`));

          const label = (
            <>
              {item.label.en}
              {item.fileNote ? (
                <span className="ms-1 font-mono text-meta text-ink-3">
                  ({item.fileNote})
                </span>
              ) : null}
              {isActive && item.label.ar ? (
                <>
                  {" "}
                  <Ar decorative className="text-accent-text">
                    {item.label.ar.text}
                  </Ar>
                </>
              ) : null}
            </>
          );

          const classes = cn(
            "text-small transition-colors duration-200",
            isActive ? "text-ink" : "text-ink-2 hover:text-ink",
          );

          return (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  className={classes}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={classes}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
