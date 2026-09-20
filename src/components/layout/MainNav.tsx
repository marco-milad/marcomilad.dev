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
                  {/* nowrap: the twin drops under the English when there is no
                      room beside it, which is the intended active state — but
                      a two-word twin like "من أنا" was breaking across those
                      two lines and reading as two fragments. It moves as one
                      word or not at all. */}
                  <Ar decorative className="whitespace-nowrap text-accent-text">
                    {item.label.ar.text}
                  </Ar>
                </>
              ) : null}
            </>
          );

          const classes = cn(
            "relative inline-block text-small transition-colors duration-200",
            // A rule that draws itself in from the start of the word. The
            // active item keeps it drawn, so hover and "you are here" use the
            // same mark at different strengths.
            "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left",
            "after:bg-accent after:transition-transform after:duration-200 after:ease-editorial after:content-['']",
            "hover:after:scale-x-100",
            isActive
              ? "text-ink after:scale-x-100"
              : "text-ink-2 after:scale-x-0 hover:text-ink",
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
