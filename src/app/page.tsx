import { lexicon, verbChain } from "@content/lexicon";
import { site } from "@content/site";
import { Ar } from "@/components/ui/Ar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Placeholder home. Phase 6 replaces this with the real composition; for now it
 * exercises the shell and the primitives so the Phase 2 checkpoint is reviewable.
 */
export default function Home() {
  return (
    <>
      <Section>
        <SectionHeader
          index="00"
          label={{ en: "Phase 2", ar: undefined }}
          level={1}
          title="Primitives and shell in place."
          lead="Header, navigation, mobile menu, footer, and the shared building blocks the four case studies will use."
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/work">View selected work</Button>
          <Button href={site.cta.href} variant="secondary">
            {site.cta.label.en}
          </Button>
          <Badge variant="status">In production</Badge>
          <Badge>Web · iOS · Android</Badge>
        </div>
      </Section>

      <Section tone="band">
        <SectionHeader
          index="01"
          label={lexicon.process}
          tone="band"
          title="The verb chain"
          lead="One idea reused as structure: the hero, the process section, and the chapter markers inside every case study all read from the same five verbs."
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {verbChain.map((verb, i) => (
            <li key={verb.key}>
              <p className="font-mono text-meta text-band-muted">0{i + 1}</p>
              <p className="mt-2 text-h3">{verb.en}</p>
              <p className="mt-1 text-h3 text-accent-on-band">
                <Ar decorative className="ar-display">
                  {verb.ar.text}
                </Ar>
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
