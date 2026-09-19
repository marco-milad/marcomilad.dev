import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { VerbChain } from "./VerbChain";

export function Hero() {
  return (
    <section className="pt-block pb-section">
      <Container>
        <p className="font-mono text-meta uppercase text-ink-3">
          {site.role} · {site.location.en}
        </p>

        <h1 className="mt-6 max-w-[14ch] text-display-xl">
          Product engineer, idea to production.
        </h1>

        <p className="mt-8 max-w-prose text-lead text-ink-2">
          I take products the whole way: understanding the business, shaping
          the model, building it, shipping it, and fixing what the first
          version got wrong. React, Next.js and TypeScript on the front,
          Postgres and real domain logic behind it — Arabic-first when the
          people using it are.
        </p>

        <div className="mt-block flex flex-wrap items-center gap-4">
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
