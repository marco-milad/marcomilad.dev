import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { revealNow } from "@/lib/reveal";
import { VerbChain } from "./VerbChain";

/**
 * The Arabic watermark is absolutely positioned on purpose: it is decorative,
 * it uses a font that is not preloaded, and taking it out of flow means a late
 * font swap cannot move the headline. No layout shift, no LCP cost.
 *
 * The hero uses revealNow rather than the scroll observer: it is already on
 * screen, and the headline is the LCP element, so it must not be waiting on
 * the bundle to be allowed to appear. It sits at delay 0 for the same reason.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-block pb-section">
      <Container>
        <p
          className="flex items-center gap-3 font-mono text-meta uppercase text-ink-3"
          {...revealNow(0, { shift: 10 })}
        >
          <span
            aria-hidden="true"
            className="block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>
            <span className="text-accent-text">{site.role}</span>{" "}
            <span aria-hidden="true">·</span> {site.location.en}
          </span>
        </p>

        <div className="relative mt-6">
          {/* Physical `right`, not `end`: the span carries dir="rtl", which
              would flip an inset-inline-end onto the left and drop it on top
              of the headline. The wrapper stays LTR and owns the position.
              Hidden below md, where there is no room beside the headline. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.12em] right-0 -z-10 hidden select-none md:block"
            // Drifts in from the edge it sits on rather than rising like
            // everything else, and arrives last: it should settle behind the
            // headline, not compete with it for the first look.
            {...revealNow(4, { shift: 0, shiftX: 40 })}
          >
            <span
              lang="ar"
              dir="rtl"
              className="ar-kufi block text-[clamp(5.5rem,13vw,11rem)] leading-none text-accent-soft"
            >
              أبني
            </span>
          </div>

          {/* Rises without fading: this is the LCP element on the home page,
              and a fade would take it out of the metric rather than make it
              arrive any sooner. */}
          {/* 15ch, not 13: Readex Pro is a wider face than the one this was
              set for, and 13ch broke the line after "Product". 14 is the
              threshold measured across 768-1440; 15 leaves slack so a fallback
              metric cannot tip it back to three lines. */}
          <h1
            className="max-w-[15ch] text-display-xl"
            {...revealNow(0, { fade: false, shift: 14 })}
          >
            Software engineer, idea to{" "}
            <span className="text-accent">production</span>.
          </h1>
        </div>

        <p className="mt-8 max-w-prose text-lead text-ink-2" {...revealNow(2)}>
          I take products the whole way: understanding the business, shaping
          the model, building it, shipping it, and fixing what the first
          version got wrong. React, Next.js and TypeScript on the front,
          Postgres and real domain logic behind it — Arabic-first when the
          people using it are.
        </p>

        <div
          className="mt-block flex flex-wrap items-center gap-4"
          {...revealNow(3)}
        >
          <Button href="/work">View selected work</Button>
          <Button href={site.cta.href} variant="secondary">
            Get in touch
          </Button>
        </div>

        {/* Closer than a section gap: the chain is part of the hero's
            statement, not the next thing down the page. */}
        <VerbChain className="mt-block" />
      </Container>
    </section>
  );
}
