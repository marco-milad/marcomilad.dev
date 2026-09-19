"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Ar } from "@/components/ui/Ar";

type RailChapter = { key: string; en: string; ar: string };

/**
 * Sticky chapter rail (lg and up).
 *
 * Links work without JavaScript; the active highlight is a progressive
 * enhancement driven by IntersectionObserver. Nothing here is required to read
 * the page.
 */
export function ChapterRail({ chapters }: { chapters: RailChapter[] }) {
  const [active, setActive] = useState<string | null>(
    chapters[0]?.key ?? null,
  );

  useEffect(() => {
    const targets = chapters
      .map((chapter) => document.getElementById(`chapter-${chapter.key}`))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(visible.target.id.replace("chapter-", ""));
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Chapters" className="sticky top-28">
      <ol className="flex flex-col gap-4">
        {chapters.map((chapter, index) => {
          const isActive = active === chapter.key;
          return (
            <li key={chapter.key}>
              <a
                href={`#chapter-${chapter.key}`}
                className={cn(
                  "block border-s-2 ps-4 transition-colors duration-200",
                  isActive
                    ? "border-accent text-ink"
                    : "border-rule text-ink-3 hover:text-ink-2",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="font-mono text-meta">
                  0{index + 1}
                </span>
                <span className="mt-1 block text-small">{chapter.en}</span>
                {/* inline-block, not block: a block with dir=rtl would push
                    the Arabic to the far edge of the rail, away from its
                    English twin. */}
                <Ar decorative className="inline-block text-small text-ink-3">
                  {chapter.ar}
                </Ar>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
