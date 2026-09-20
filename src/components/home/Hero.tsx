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
          className="font-mono text-meta uppercase text-ink-3"
          {...revealNow(0, { shift: 10 })}
        >
          <span className="text-accent-text">{site.role}</span>{" "}
          <span aria-hidden="true">·</span> {site.location.en}
        </p>

        <div className="relative mt-6">
          {/* Physical `right`, not `end`: the span carries dir="rtl", which
              would flip an inset-inline-end onto the left and drop it on top
              of the headline. The wrapper stays LTR and owns the position.
              Hidden below md, where there is no room beside the headline. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.12em] right-0 -z-10 hidden select-none md:block"
            // Last in, and further: the watermark should settle behind the
            // headline rather than compete with it for the first look.
            {...revealNow(4, { shift: 28 })}
          >
            <span
              lang="ar"
              dir="rtl"
              className="ar-kufi block text-[clamp(5rem,12vw,10rem)] leading-none text-accent-soft"
            >
              أبني
            </span>
          </div>

          {/* Rises without fading: this is the LCP element on the home page,
              and a fade would take it out of the metric rather than make it
              arrive any sooner. */}
          <h1
            className="max-w-[13ch] text-display-xl"
            {...revealNow(0, { fade: false, shift: 14 })}
          >
            Product engineer, idea to{" "}
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

        <VerbChain className="mt-section" />
      </Container>
    </section>
  );
}
