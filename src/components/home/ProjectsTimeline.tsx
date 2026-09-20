import Link from "next/link";
import { lexicon } from "@content/lexicon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllProjects } from "@/lib/content";
import { countWord } from "@/lib/numbers";
import { reveal } from "@/lib/reveal";

const MONTH_LABEL = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2026-05" → absolute month index, so spans can be compared across years. */
function monthIndex(value: string): number {
  const [year, month] = value.split("-").map(Number);
  return (year ?? 0) * 12 + ((month ?? 1) - 1);
}

function label(index: number): string {
  const year = Math.floor(index / 12);
  const month = index % 12;
  return `${MONTH_LABEL[month]} ${String(year).slice(2)}`;
}

/**
 * Build windows, not a career timeline.
 *
 * Every project shipped inside one ten-month stretch, so a year-scale
 * chronology would just repeat Featured Work. At month scale the bars overlap,
 * and the overlap is the point: four products running at once through mid-2026.
 *
 * Dates come from each project's own repository history.
 */
export function ProjectsTimeline() {
  const projects = getAllProjects();
  const now = new Date();
  const nowIndex = now.getFullYear() * 12 + now.getMonth();

  const spans = projects.map((project) => {
    const start = monthIndex(project.timeline.start);
    const end =
      project.timeline.end === "present"
        ? nowIndex
        : monthIndex(project.timeline.end);
    return { project, start, end: Math.max(end, start) };
  });

  const first = Math.min(...spans.map((s) => s.start));
  const last = Math.max(...spans.map((s) => s.end));
  const total = last - first + 1;

  // Ticks every other month keeps the axis readable at tablet width.
  const ticks = Array.from({ length: total }, (_, i) => first + i).filter(
    (_, i) => i % 2 === 0 || i === total - 1,
  );

  return (
    <Section id="timeline">
      <SectionHeader
        index="03"
        label={{ en: "Build windows", ar: lexicon.process.ar }}
        title={`${countWord(projects.length, true)} products in ten months`}
        lead="Not a career timeline — the actual build windows, taken from each project's repository history. They overlap, which is the honest part: most of these ran alongside each other."
      />

      {/* Axis */}
      <div
        aria-hidden="true"
        className="hidden grid-flow-col justify-between border-b border-rule pb-2 font-mono text-meta uppercase text-ink-3 md:grid"
        {...reveal(0, { shift: 8 })}
      >
        {ticks.map((tick) => (
          <span key={tick}>{label(tick)}</span>
        ))}
      </div>

      <ol className="mt-4 flex flex-col">
        {spans.map(({ project, start, end }, row) => {
          const left = ((start - first) / total) * 100;
          const width = ((end - start + 1) / total) * 100;
          const range =
            project.timeline.end === "present"
              ? `${label(start)} — present`
              : `${label(start)} — ${label(end)}`;

          return (
            <li
              key={project.slug}
              className="border-b border-rule"
              {...reveal(row + 1, { shift: 12 })}
            >
              <Link
                href={`/work/${project.slug}`}
                // Transform, not padding: a hover that changes a box's size
                // is a layout shift, and Chrome only forgives those after a
                // discrete input, which a hover is not.
                className="group grid gap-3 py-5 transition-transform duration-base ease-editorial hover:translate-x-1 md:grid-cols-[14rem_1fr] md:items-center md:gap-8"
              >
                <div>
                  <p className="text-h3 transition-colors duration-base ease-editorial group-hover:text-accent-text">
                    {project.title}
                  </p>
                  <p className="mt-1 font-mono text-meta uppercase text-ink-3">
                    {range}
                  </p>
                </div>

                <div>
                  {/* The bar. Track is a hairline; the fill is the product's
                      own colour, so the row reads as that project. */}
                  <div className="relative h-2 w-full rounded-full bg-paper-sunk">
                    <span
                      className="absolute inset-y-0 rounded-full group-hover:brightness-110"
                      data-reveal-bar=""
                      {...reveal(row + 2, {
                        style: {
                          insetInlineStart: `${left}%`,
                          width: `${width}%`,
                          background: project.brand,
                        },
                      })}
                    />
                  </div>

                  {/* Revealed on hover and on keyboard focus, never hidden
                      from screen readers — it is real content, not a tooltip. */}
                  <p className="mt-2 text-small text-ink-2 opacity-100 transition-opacity duration-base ease-editorial md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    {project.positioning}
                    <span className="text-ink-3">
                      {" · "}
                      {project.platforms.join(" · ")}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
