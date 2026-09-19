import { Container } from "@/components/ui/Container";
import { getProofFacts } from "@/lib/content";

/**
 * Every line here is derived from the case studies, so it cannot drift from
 * what the work actually shows.
 */
export function ProofStrip() {
  const facts = getProofFacts();

  return (
    <section className="border-y border-rule bg-paper-raised py-8">
      <Container>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-meta uppercase text-ink-2">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-8">
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
