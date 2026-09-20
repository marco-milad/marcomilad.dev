import type { Metadata } from "next";
import { lexicon } from "@content/lexicon";
import { site } from "@content/site";
import { reveal, revealNow } from "@/lib/reveal";
import { Ar } from "@/components/ui/Ar";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Marco Milad — software engineering roles, and selected client work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <SectionHeader
          label={lexicon.contact}
          level={1}
          title={
            <>
              {lexicon.letsStart.en}{" "}
              <Ar decorative className="ar-display text-accent-text">
                {lexicon.letsStart.ar?.text}
              </Ar>
            </>
          }
          lead="Two kinds of conversation, and both are welcome."
        />

        <div className="grid gap-block lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" {...revealNow(3)}>
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-rule pt-6" {...revealNow(4)}>
              <h2 className="text-h3">Hiring</h2>
              <p className="mt-3 max-w-prose text-body text-ink-2">
                The résumé is the short version. If you want the long one, the
                case studies walk through the decisions — and I am happy to go
                deeper on any of them.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={site.cv.href} external size="md">
                  Résumé ({site.cv.note})
                </Button>
                <Button
                  href={site.links.linkedin}
                  external
                  variant="secondary"
                  size="md"
                >
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="mt-block border-t border-rule pt-6" {...reveal()}>
              <h2 className="text-h3">Building something</h2>
              <p className="mt-3 max-w-prose text-body text-ink-2">
                Tell me what breaks today rather than the feature list — what it
                costs, who it costs, and what fixing it would be worth.
              </p>
            </div>

            <div className="mt-block border-t border-rule pt-6" {...reveal()}>
              <h2 className="text-h3">Direct</h2>
              <ul className="mt-3 flex flex-col gap-2 text-body">
                <li>
                  <TextLink href={`mailto:${site.email}`}>
                    {site.email}
                  </TextLink>
                </li>
                <li>
                  <TextLink href={site.links.github} external>
                    GitHub
                  </TextLink>
                </li>
              </ul>
              <p className="mt-4 text-small text-ink-3">
                Based in {site.location.en}. I work with teams in other
                timezones regularly.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
