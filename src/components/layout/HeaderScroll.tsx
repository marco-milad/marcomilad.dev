"use client";

import { useEffect, useRef } from "react";

/**
 * Marks the header once the page has scrolled, so it can separate itself from
 * the content passing underneath.
 *
 * It watches a marker at the very top of the document rather than the header
 * itself. The usual trick — observe the sticky element against a root shrunk
 * by a pixel at the top — only works when the element rests a pixel above its
 * stuck position. This header sits at top: 0, so it was clipped by that shrink
 * from the very first frame and reported as stuck before anyone had scrolled.
 *
 * The marker is absolutely positioned against the initial containing block, so
 * it occupies no space and cannot move anything.
 *
 * Only paint changes on the header — background, border, shadow. Its height is
 * deliberately left alone: resizing it mid-scroll would move everything below
 * it, and a scroll is not the kind of input Chrome forgives a layout shift for.
 */
export function HeaderScroll() {
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = marker.current;
    const header = document.querySelector("header");
    if (!target || !header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        header.toggleAttribute("data-stuck", !entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={marker}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 h-px w-px"
    />
  );
}
