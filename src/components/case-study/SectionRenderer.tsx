import type { Section } from "@content/schema";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { Ar } from "@/components/ui/Ar";
import { Badge } from "@/components/ui/Badge";
import { DecisionStoryBlock } from "./DecisionStoryBlock";
import { DirectionMirror } from "./DirectionMirror";
import { LayerDiagram } from "./LayerDiagram";
import { MetricList } from "./MetricList";
import { ProjectImage } from "./ProjectImage";

type Tone = "paper" | "band";

/**
 * `from` continues a cascade the caller has already started — a heading at
 * beat 0 hands its paragraphs beat 1 onward, so a block reads top to bottom
 * rather than arriving in two unrelated pieces.
 */
function Prose({
  paragraphs,
  tone,
  from = 0,
}: {
  paragraphs: string[];
  tone: Tone;
  from?: number;
}) {
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph.slice(0, 40)}
          className={cn(
            "max-w-prose text-body",
            tone === "band" ? "text-band-fg" : "text-ink-2",
          )}
          {...reveal(from + index, { shift: 12 })}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * Intro sections sit directly under the page h1, so they are h2. Sections
 * inside a chapter sit under the chapter's own h2, so they are h3. Passing
 * the level keeps the outline correct instead of hardcoding one depth.
 */
function BlockHeading({
  title,
  tone,
  level,
}: {
  title: string | undefined;
  tone: Tone;
  level: 2 | 3;
}) {
  if (!title) return null;
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      className={cn("mb-6 text-h2", tone === "band" && "text-band-fg")}
      {...reveal(0)}
    >
      {title}
    </Tag>
  );
}

/**
 * One section of a case study. Every section type the schema allows has a
 * presentation here, so content can add a section without touching layout.
 */
export function SectionRenderer({
  section,
  tone = "paper",
  headingLevel = 3,
}: {
  section: Section;
  tone?: Tone;
  headingLevel?: 2 | 3;
}) {
  const band = tone === "band";
  const muted = band ? "text-band-muted" : "text-ink-3";
  const rule = band ? "border-band-rule" : "border-rule";

  switch (section.type) {
    case "overview":
    case "challenge":
    case "approach":
    case "lessons":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <Prose paragraphs={section.body} tone={tone} from={1} />
        </section>
      );

    case "rtlNote":
    case "outcome":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <Prose paragraphs={section.body} tone={tone} from={1} />
          {section.figure ? (
            <div className="mt-10">
              <ProjectImage asset={section.figure} tone={tone} />
            </div>
          ) : null}
        </section>
      );

    case "role":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p
                className={cn("font-mono text-meta uppercase", muted)}
                {...reveal(0, { shift: 8 })}
              >
                What I owned
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {section.ownership.owned.map((item, index) => (
                  <li
                    key={item}
                    className={cn("border-t pt-2 text-body", rule)}
                    {...reveal(index + 1, { step: 50, shift: 10 })}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {section.ownership.contributed?.length ||
            section.ownership.team ? (
              <div>
                {section.ownership.contributed?.length ? (
                  <>
                    <p
                      className={cn("font-mono text-meta uppercase", muted)}
                      {...reveal(0, { shift: 8 })}
                    >
                      What I contributed to
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {section.ownership.contributed.map((item, index) => (
                        <li
                          key={item}
                          className={cn("border-t pt-2 text-body", rule)}
                          {...reveal(index + 1, { step: 50, shift: 10 })}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {section.ownership.team ? (
                  <p className={cn("mt-6 text-small", muted)} {...reveal(2)}>
                    Team: {section.ownership.team}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      );

    case "requirements":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}

          <ol className="flex flex-col">
            {section.items.map((item, index) => (
              <li
                key={item.requirement}
                className={cn(
                  "grid gap-3 border-t py-6 md:grid-cols-2 md:gap-12",
                  rule,
                )}
                {...reveal(index, { shift: 12 })}
              >
                <p className={cn("text-body", band ? "text-band-fg" : "")}>
                  {item.requirement}
                </p>
                <p className={cn("text-body", muted)}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "me-2 font-mono text-meta",
                      band ? "text-accent-on-band" : "text-accent-text",
                    )}
                  >
                    →
                  </span>
                  {item.decision}
                </p>
              </li>
            ))}
          </ol>
        </section>
      );

    case "solution":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <Prose paragraphs={section.body} tone={tone} from={1} />
          {section.figure ? (
            <div className="mt-10">
              <ProjectImage asset={section.figure} tone={tone} />
            </div>
          ) : null}
        </section>
      );

    case "features":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <div className="grid gap-10 md:grid-cols-2">
            {section.items.map((item, index) => (
              <div key={item.title} {...reveal(index, { shift: 14 })}>
                <h4 className={cn("border-t pt-4 text-h3", rule)}>
                  {item.title}
                </h4>
                <p className={cn("mt-3 text-body", muted)}>{item.body}</p>
                {item.figure ? (
                  <div className="mt-6">
                    <ProjectImage
                      asset={item.figure}
                      tone={tone}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      zoomable
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      );

    case "architecture":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}
          <LayerDiagram layers={section.layers} tone={tone} />
          {section.figure ? (
            <div className="mt-10">
              <ProjectImage asset={section.figure} tone={tone} />
            </div>
          ) : null}
        </section>
      );

    case "highlights":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <ul className="grid gap-8 md:grid-cols-2">
            {section.items.map((item, index) => (
              <li key={item.title} {...reveal(index, { shift: 14 })}>
                <h4 className={cn("border-t pt-4 text-h3", rule)}>
                  {item.title}
                </h4>
                <p className={cn("mt-3 text-body", muted)}>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
      );

    case "decisions":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <div className="flex flex-col gap-16">
            {section.stories.map((story, index) => (
              <DecisionStoryBlock
                key={story.title}
                story={story}
                tone={tone}
                number={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
        </section>
      );

    case "quality":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}
          {section.metrics?.length ? (
            <MetricList metrics={section.metrics} tone={tone} />
          ) : null}
          {section.security?.length ? (
            <div className="mt-10">
              <p
                className={cn("font-mono text-meta uppercase", muted)}
                {...reveal(0, { shift: 8 })}
              >
                Security
              </p>
              <ul className="mt-4 flex flex-col">
                {section.security.map((item, index) => (
                  <li
                    key={item}
                    className={cn("border-t py-3 text-body", rule, muted)}
                    {...reveal(index + 1, { step: 50, shift: 10 })}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      );

    case "delivery":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          <Prose paragraphs={section.body} tone={tone} from={1} />
          {section.figure ? (
            <div className="mt-10">
              <ProjectImage asset={section.figure} tone={tone} />
            </div>
          ) : null}
        </section>
      );

    case "glossary":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}
          <dl className="grid gap-6 sm:grid-cols-2">
            {section.terms.map((term, index) => (
              <div
                key={term.ar}
                className={cn("border-t pt-4", rule)}
                {...reveal(index, { step: 55, shift: 10 })}
              >
                <dt className="flex flex-wrap items-baseline gap-3">
                  {/* Real domain vocabulary: meaningful, so not aria-hidden. */}
                  <Ar className="text-h3">{term.ar}</Ar>
                  <span className={cn("font-mono text-meta uppercase", muted)}>
                    {term.en}
                  </span>
                </dt>
                <dd className={cn("mt-2 text-small", muted)}>
                  {term.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "mirror":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}
          <DirectionMirror ltr={section.ltr} rtl={section.rtl} tone={tone} />
          {section.notes?.length ? (
            <ul className="mt-8 flex flex-col gap-3">
              {section.notes.map((note, index) => (
                <li
                  key={note}
                  className={cn("max-w-prose text-small", muted)}
                  {...reveal(index, { step: 55, shift: 10 })}
                >
                  <Badge tone={tone} className="me-3">
                    RTL note
                  </Badge>
                  {note}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      );

    case "ux":
    case "gallery":
      return (
        <section>
          <BlockHeading title={section.title} tone={tone} level={headingLevel} />
          {"body" in section && section.body ? (
            <div className="mb-8">
              <Prose paragraphs={section.body} tone={tone} from={1} />
            </div>
          ) : null}
          <div className="grid gap-10 md:grid-cols-2">
            {section.figures.map((figure, index) => (
              <ProjectImage
                key={figure.alt}
                asset={figure}
                tone={tone}
                sizes="(min-width: 768px) 50vw, 100vw"
                zoomable={figure.treatment === "plate"}
                number={String(index + 1).padStart(2, "0")}
                revealIndex={index}
              />
            ))}
          </div>
        </section>
      );
  }
}

