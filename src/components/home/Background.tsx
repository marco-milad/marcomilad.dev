import Link from "next/link";
import { experience } from "@content/experience";
import { lexicon } from "@content/lexicon";
import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * About and experience in one band, so the home page never reads as a résumé
 * pasted into a website. The full timeline lives on /about.
 */
export function Background() {
  return (
    <Section id="background">
      <SectionHeader
        index="05"
        label={lexicon.background}
        title="Where this comes from"
      />

      <div className="grid gap-block lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="max-w-prose text-body text-ink-2">
            I am a product engineer in {site.location.en}, working end to end:
            requirements and business analysis at one end, production
            deployment and whatever the first version got wrong at the other.
          </p>
          <p className="mt-5 max-w-prose text-body text-ink-2">
            Most of what I build is used by people working in Arabic — in a
            shop, at a counter, on a phone on a slow network. That shapes the
            engineering more than any framework preference does.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block text-small text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            More about how I work
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="lg:col-span-7">
          <ol className="flex flex-col">
            {experience.map((role) => (
              <li
                key={`${role.org}-${role.start}`}
                className="grid gap-2 border-t border-rule py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <h3 className="text-h3">{role.org}</h3>
                  <p className="mt-1 text-small text-ink-2">{role.title}</p>
                </div>
                <p className="font-mono text-meta uppercase text-ink-3 sm:text-end">
                  {role.start} — {role.end}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
