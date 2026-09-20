import type { DecisionStory } from "@content/schema";
import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";
import { Badge } from "@/components/ui/Badge";
import { ProjectImage } from "./ProjectImage";

const STEP_LABELS = {
  problem: "Problem",
  rootCause: "Root cause",
  decision: "Decision",
  implementation: "Implementation",
  result: "Result",
} as const;

function Step({
  label,
  paragraphs,
  band,
  index = 0,
}: {
  label: string;
  paragraphs: string[];
  band: boolean;
  /** Position in the column's cascade: diagnosis, then response. */
  index?: number;
}) {
  return (
    <div {...reveal(index, { shift: 12 })}>
      <p
        className={cn(
          "font-mono text-meta uppercase",
          band ? "text-accent-on-band" : "text-accent-text",
        )}
      >
        {label}
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={cn(
              "max-w-prose text-body",
              band ? "text-band-fg" : "text-ink-2",
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * A decision, told in order: what broke, why, what was chosen, what was built,
 * what changed. Two columns on desktop — diagnosis on one side, response on
 * the other — and a single sequence on a phone.
 */
export function DecisionStoryBlock({
  story,
  tone = "paper",
  number,
}: {
  story: DecisionStory;
  tone?: "paper" | "band";
  number: string;
}) {
  const band = tone === "band";

  return (
    <article
      className={cn(
        "border-t pt-8",
        band ? "border-band-rule" : "border-rule",
      )}
    >
      <header
        className="flex flex-wrap items-baseline gap-x-4 gap-y-3"
        {...reveal(0)}
      >
        <span
          className={cn(
            "font-mono text-meta",
            band ? "text-band-muted" : "text-ink-3",
          )}
        >
          {number}
        </span>
        <h4 className="text-h3">{story.title}</h4>
        <div className="flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <Badge key={tag} tone={tone}>
              {tag.replace("-", " ")}
            </Badge>
          ))}
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-8">
          <Step label={STEP_LABELS.problem} paragraphs={story.problem} band={band} index={1} />
          {story.rootCause ? (
            <Step label={STEP_LABELS.rootCause} paragraphs={story.rootCause} band={band} index={2} />
          ) : null}
          {story.constraints?.length ? (
            <div {...reveal(3, { shift: 12 })}>
              <p
                className={cn(
                  "font-mono text-meta uppercase",
                  band ? "text-accent-on-band" : "text-accent-text",
                )}
              >
                Constraints
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {story.constraints.map((constraint) => (
                  <li
                    key={constraint}
                    className={cn(
                      "text-body",
                      band ? "text-band-fg" : "text-ink-2",
                    )}
                  >
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-8">
          <Step label={STEP_LABELS.decision} paragraphs={story.decision} band={band} index={2} />
          <Step label={STEP_LABELS.implementation} paragraphs={story.implementation} band={band} index={3} />
          <Step label={STEP_LABELS.result} paragraphs={story.result} band={band} index={4} />
        </div>
      </div>

      {story.figure ? (
        <div className="mt-10">
          <ProjectImage asset={story.figure} tone={tone} zoomable />
        </div>
      ) : null}
    </article>
  );
}

