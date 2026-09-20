import { lexicon } from "@content/lexicon";
import { site } from "@content/site";
import { reveal } from "@/lib/reveal";
import { Ar } from "@/components/ui/Ar";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

/**
 * Two paths, because the two audiences want different things: a recruiter
 * wants the CV and a profile, a founder wants to describe a problem.
 *
 * This is one of the two or three places Egyptian Arabic is used rather than
 * MSA — it is the human moment on the page.
 */
export function FinalCta() {
  return (
    <Section tone="band" id="contact">
      <h2 className="text-display" {...reveal(0)}>
        {lexicon.letsStart.en}{" "}
        <Ar decorative className="ar-display text-accent-on-band">
          {lexicon.letsStart.ar?.text}
        </Ar>
      </h2>

      <div className="mt-block grid gap-block md:grid-cols-2 md:gap-16">
        <div className="border-t border-band-rule pt-8" {...reveal(1)}>
          <h3 className="text-h3">Hiring?</h3>
          <p className="mt-4 max-w-prose text-body text-band-fg">
            The résumé has the short version; the case studies have the long
            one. Happy to walk through any decision on this site in detail.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={site.cv.href} external tone="band" size="md">
              Résumé ({site.cv.note})
            </Button>
            <Button
              href={site.links.linkedin}
              external
              variant="secondary"
              tone="band"
              size="md"
            >
              LinkedIn
            </Button>
          </div>
        </div>

        <div className="border-t border-band-rule pt-8" {...reveal(2)}>
          <h3 className="text-h3">Building something?</h3>
          <p className="mt-4 max-w-prose text-body text-band-fg">
            Tell me the problem rather than the spec — what breaks today, who
            it costs, and what it would mean to fix it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={site.cta.href} tone="band" size="md">
              Start a conversation
            </Button>
            <TextLink href={`mailto:${site.email}`} tone="band">
              {site.email}
            </TextLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
