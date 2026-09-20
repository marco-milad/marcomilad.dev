import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lexicon } from "@content/lexicon";
import { reveal } from "@/lib/reveal";
import { Ar } from "@/components/ui/Ar";
import { Container } from "@/components/ui/Container";
import { CaseHero } from "@/components/case-study/CaseHero";
import { ChapterRail } from "@/components/case-study/ChapterRail";
import { ProjectImage } from "@/components/case-study/ProjectImage";
import { SectionRenderer } from "@/components/case-study/SectionRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  getAdjacentProject,
  getAllProjects,
  getChapters,
  getProject,
} from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.seo.title,
      description: project.seo.description,
      url: `/work/${project.slug}`,
      publishedTime: project.updatedAt,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { intro, chapters } = getChapters(project);
  const next = getAdjacentProject(project.slug);

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <CaseHero project={project} />

      {/* Intro sections sit above the chapter structure. */}
      {intro.length > 0 ? (
        <Container>
          <div className="flex flex-col gap-section border-t border-rule pt-section">
            {intro.map((section, index) => (
              // Intro sections sit directly under the page h1.
              <SectionRenderer
                key={`${section.type}-${index}`}
                section={section}
                headingLevel={2}
              />
            ))}
          </div>
        </Container>
      ) : null}

      {/* Contents, collapsed on phones where a sticky rail would cost too much room. */}
      <Container>
        <details
          className="mt-section border-t border-rule pt-6 lg:hidden"
          {...reveal()}
        >
          <summary className="cursor-pointer font-mono text-meta uppercase text-ink-3">
            Contents
          </summary>
          <ol className="mt-4 flex flex-col gap-3">
            {chapters.map((chapter, index) => (
              <li key={chapter.key}>
                <a href={`#chapter-${chapter.key}`} className="text-body">
                  <span className="me-3 font-mono text-meta text-ink-3">
                    0{index + 1}
                  </span>
                  {chapter.en}{" "}
                  <Ar decorative className="text-ink-3">
                    {chapter.ar}
                  </Ar>
                </a>
              </li>
            ))}
          </ol>
        </details>
      </Container>

      <Container>
        <div className="mt-section grid gap-12 lg:grid-cols-[12rem_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <ChapterRail
              chapters={chapters.map(({ key, en, ar }) => ({ key, en, ar }))}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-section">
            {chapters.map((chapter) => {
              // The engineering chapter runs on the ink band: it is the
              // technical heart of the story and the change of ground says so.
              const band = chapter.key === "engineer";

              return (
                <section
                  key={chapter.key}
                  id={`chapter-${chapter.key}`}
                  className={
                    band
                      ? // An inset dossier rather than a full-bleed band: the
                        // chapter rail sits beside it, and a full-bleed dark
                        // ground would put light-on-dark rail text on paper.
                        "band scroll-mt-24 rounded-figure p-6 sm:p-10 lg:p-12"
                      : "scroll-mt-24"
                  }
                >
                  <header
                    className="mb-block flex flex-wrap items-baseline gap-4"
                    {...reveal()}
                  >
                    <h2 className={band ? "text-h2 text-band-fg" : "text-h2"}>
                      {chapter.en}
                    </h2>
                    <Ar
                      decorative
                      className={
                        band
                          ? "ar-display text-h3 text-accent-on-band"
                          : "ar-display text-h3 text-accent-text"
                      }
                    >
                      {chapter.ar}
                    </Ar>
                  </header>

                  <div className="flex flex-col gap-section">
                    {chapter.sections.map((section, index) => (
                      <SectionRenderer
                        key={`${section.type}-${index}`}
                        section={section}
                        tone={band ? "band" : "paper"}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Container>

      {next ? (
        <Container>
          <div className="mt-section border-t border-rule py-section">
            <p
              className="font-mono text-meta uppercase text-ink-3"
              {...reveal(0, { shift: 8 })}
            >
              {lexicon.nextProject.en}{" "}
              <span aria-hidden="true">·</span>{" "}
              <Ar decorative>{lexicon.nextProject.ar?.text}</Ar>
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-6 block"
              {...reveal(1)}
            >
              <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:items-center">
                <div>
                  <h2 className="text-h2 transition-colors duration-base ease-editorial group-hover:text-accent-text">
                    {next.title}
                  </h2>
                  <p className="mt-3 text-body text-ink-2">
                    {next.positioning}
                  </p>
                </div>
                <ProjectImage
                  asset={next.cover}
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
              </div>
            </Link>
          </div>
        </Container>
      ) : null}
    </article>
  );
}
