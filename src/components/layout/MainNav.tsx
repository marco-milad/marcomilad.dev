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

          // Every item reserves the row for its Arabic twin, whether or not it
          // is the active one. Rendering the twin only when active made the
          // active item taller than its neighbours, so its English sat a line
          // higher than theirs — the mark moved the thing it was marking.
          // Now only the twin's opacity changes and the row never moves.
          const label = (
            <span className="flex flex-col items-start gap-1 leading-none">
              <span className="flex items-baseline gap-1 leading-none">
                {item.label.en}
                {item.fileNote ? (
                  <span className="font-mono text-[0.7rem] text-ink-3">
                    ({item.fileNote})
                  </span>
                ) : null}
              </span>
              {item.label.ar ? (
                <Ar
                  decorative
                  className={cn(
                    "whitespace-nowrap text-[0.7rem] leading-none transition-opacity duration-300 ease-editorial",
                    isActive ? "text-accent-text opacity-100" : "opacity-0",
                  )}
                >
                  {item.label.ar.text}
                </Ar>
              ) : null}
            </span>
          );

          const classes = cn(
            "relative block text-small transition-colors duration-200",
            // A rule that draws itself in from the start of the word. The
            // active item keeps it drawn, so hover and "you are here" use the
            // same mark at different strengths.
            "after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:origin-left",
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
