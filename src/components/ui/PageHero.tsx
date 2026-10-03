import type { Label } from "@content/types";
import { cn } from "@/lib/cn";
import { revealNow } from "@/lib/reveal";
import { Ar } from "./Ar";
import { Container } from "./Container";

/**
 * The header every inner page opens with.
 *
 * Two things make it worth having as its own component rather than another
 * SectionHeader:
 *
 * 1. The eyebrow carries facts, not the page's own name. "Work · 2025 to now ·
 *    four in production" tells a reader something; "Selected work" tells them
 *    what they already clicked. The facts are derived from the content layer,
 *    so they cannot drift.
 * 2. It gives the page one display-Arabic moment, which until now only the
 *    home page had. The word is the page's own name, taken from the lexicon —
 *    nothing new to review.
 *
 * The Arabic sits at the inline end, aligned to the headline's band and kept
 * inside the container. That is the same relationship the home hero uses, and
 * it is deliberately not the corner-bleed treatment: this should read as our
 * page header, not as somebody else's.
 */
export function PageHero({
  facts,
  title,
  arabic,
  lead,
  className,
}: {
  /** Short, derived, already true. Joined with a middle dot. */
  facts: string[];
  title: React.ReactNode;
  /** The page's own name; the Arabic side is used as the display word. */
  arabic?: Label;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-rule pt-block pb-block", className)}>
      <Container>
        <p
          className="flex items-center gap-3 font-mono text-meta uppercase text-ink-3"
          {...revealNow(0, { shift: 10 })}
        >
          <span
            aria-hidden="true"
            className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{facts.join(" · ")}</span>
        </p>

        <div className="relative mt-6">
          {arabic?.ar ? (
            // Physical `right`, not `end`: the span carries dir="rtl", and a
            // logical inset would flip it onto the headline. The wrapper stays
            // LTR and owns the position.
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 -z-10 hidden select-none md:block"
              {...revealNow(3, { shift: 0, shiftX: 32 })}
            >
              <span
                lang="ar"
                dir="rtl"
                className="ar-kufi block text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-accent-soft"
              >
                {arabic.ar.text}
              </span>
            </div>
          ) : null}

          {/* Rises without fading: this is the page's LCP text. The measure is
              in em rather than ch for the same reason as the home hero — a ch
              is the width of the font's own "0", so it moves when the real
              font replaces the fallback. */}
          <h1
            className="max-w-[11em] text-display"
            {...revealNow(1, { fade: false, shift: 14 })}
          >
            {title}
          </h1>
        </div>

        {lead ? (
          <p
            className="mt-6 max-w-prose text-lead text-ink-2"
            {...revealNow(2)}
          >
            {lead}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
