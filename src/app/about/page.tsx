import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import portrait from "@content/about/portrait.jpg";
import working from "@content/about/working.jpg";
import { certifications, education, experience } from "@content/experience";
import { lexicon } from "@content/lexicon";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VerbChain } from "@/components/home/VerbChain";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject } from "@/lib/content";
import { breadcrumbJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marco Milad, product engineer in Cairo — how I work, where I have worked, and the products behind it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <Section>
        <div className="grid gap-block lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              label={lexicon.about}
              level={1}
              title="I build the whole product, not a layer of it"
            />

            <div className="flex flex-col gap-5 text-body text-ink-2">
              <p className="max-w-prose">
                I am a product engineer in {site.location.en}. In practice that
                means I am the person who sits with the business problem first
                — what makes money, what breaks, what nobody can change — and
                then stays with it through the data model, the interface, the
                deployment, and whatever the first version got wrong.
              </p>
              <p className="max-w-prose">
                Most of the systems I have built are used by people working in
                Arabic: a shop counter, a stock room, a phone on a network that
                is not fast. That shapes the engineering more than any framework
                preference. Right-to-left is not a translation layer, a payment
                flow has to match how money actually moves, and a report that
                disagrees with another report is worse than no report.
              </p>
              <p className="max-w-prose">
                I like the parts most people skip: making the guarantee
                structural rather than careful, proving a bug before fixing it,
                and writing down the limitation instead of hoping nobody finds
                it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Image
              src={portrait}
              alt="Marco Milad"
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              priority
              className="h-auto w-full rounded-figure border border-rule"
            />
          </div>
        </div>
      </Section>

      <Section tone="band">
        <SectionHeader
          label={lexicon.process}
          tone="band"
          title="How I work"
          lead="The same five stages every project goes through — described in full on the home page, with a real artifact behind each one."
        />
        <VerbChain tone="band" />

        <div className="mt-section grid items-center gap-block lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <Image
              src={working}
              alt="Marco Milad outdoors in Cairo"
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              loading="lazy"
              className="h-auto w-full rounded-figure"
            />
          </figure>
          <p className="max-w-prose text-lead text-band-fg lg:col-span-7">
            Most of this work happens remotely, for clients in Cairo and
            further out. The part I care about is the same either way: being
            close enough to the business to know which constraint is the real
            one.
          </p>
        </div>
      </Section>

      <Section id="experience">
        <SectionHeader label={lexicon.experience} title="Experience" />

        <ol className="flex flex-col">
          {experience.map((role) => (
            <li
              key={`${role.org}-${role.start}`}
              className="grid gap-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <h3 className="text-h3">{role.org}</h3>
                <p className="mt-2 text-small text-ink-2">{role.title}</p>
                <p className="mt-2 font-mono text-meta uppercase text-ink-3">
                  {role.start} — {role.end}
                </p>
                <p className="mt-1 font-mono text-meta uppercase text-ink-3">
                  {role.location}
                </p>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-prose text-body text-ink-2">
                  {role.summary}
                </p>

                {role.highlights?.length ? (
                  <ul className="mt-4 flex flex-col gap-2">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="max-w-prose text-body text-ink-2"
                      >
                        <span aria-hidden="true" className="me-2 text-accent">
                          —
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {role.projects?.length ? (
                  <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-meta uppercase text-ink-3">
                    {role.projects.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/work/${slug}`}
                          className="text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2"
                        >
                          {project.title}
                        </Link>
                      );
                    })}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-prose text-small text-ink-3">
          M.M Bags and the gold and jewelry ERP were built independently — the
          first for a family retail business, the second directly for a shop
          owner — rather than through an agency.
        </p>
      </Section>

      <Section>
        <div className="grid gap-block md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-mono text-meta uppercase text-ink-3">
              Education
            </h2>
            <p className="mt-4 text-h3">{education.degree}</p>
            <p className="mt-2 text-body text-ink-2">{education.school}</p>
            <p className="mt-1 font-mono text-meta uppercase text-ink-3">
              {education.year}
            </p>
          </div>

          <div>
            <h2 className="font-mono text-meta uppercase text-ink-3">
              Certifications
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  <p className="text-h3">{certification.name}</p>
                  <p className="mt-1 text-body text-ink-2">
                    {certification.issuer}
                  </p>
                  <p className="mt-1 font-mono text-meta uppercase text-ink-3">
                    {certification.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-section flex flex-wrap gap-4 border-t border-rule pt-block">
          <Button href="/contact">{lexicon.letsStart.en}</Button>
          <Button href={site.cv.href} external variant="secondary">
            Résumé ({site.cv.note})
          </Button>
        </div>
      </Section>
    </>
  );
}
