"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole site.
 *
 * Elements opt in on the server with `data-reveal` (see lib/reveal.ts). This
 * watches them, flips `data-in` as each comes into view, and stops watching it
 * — entrances are one-shot, so nothing re-animates on the way back up and the
 * observer's working set only ever shrinks.
 *
 * Two cases are handled explicitly, because both would otherwise leave content
 * invisible, which is the one outcome this system may not produce:
 *
 *   - Anything already scrolled past (a reload halfway down, a jump to a hash)
 *     never enters the viewport from below. The first callback reports those
 *     too, so they are shown from their geometry rather than waited on.
 *   - Anything still waiting when the footer arrives has run out of page. The
 *     footer carries `data-reveal-flush` and releases the remainder.
 */

const ROOT_MARGIN = "0px 0px -8% 0px";

declare global {
  interface Window {
    /** Read by the inline failsafe in RevealScript. */
    __revealsActive?: boolean;
  }
}

export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    // Tell the inline failsafe the observer is alive, before the early return:
    // a reduced-motion visitor has an un-armed document and no work to do, but
    // the timer should still find a live island rather than a dead one.
    window.__revealsActive = true;

    if (!document.documentElement.hasAttribute("data-reveal-armed")) return;

    const show = (element: Element) => element.setAttribute("data-in", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target;

          if (!entry.isIntersecting) {
            // Above the viewport: it will never enter from below, so show it
            // where it stands. Below the viewport is the normal waiting state.
            if (entry.boundingClientRect.bottom <= 0) {
              show(target);
              observer.unobserve(target);
            }
            continue;
          }

          if (target.hasAttribute("data-reveal-flush")) {
            for (const pending of document.querySelectorAll(
              "[data-reveal]:not([data-in])",
            )) {
              show(pending);
              observer.unobserve(pending);
            }
            observer.unobserve(target);
            continue;
          }

          show(target);
          observer.unobserve(target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    const scan = () => {
      for (const element of document.querySelectorAll(
        "[data-reveal]:not([data-in]), [data-reveal-flush]",
      )) {
        observer.observe(element);
      }
    };

    scan();
    // A client-side navigation can commit the new tree after this effect has
    // already run; a second pass on the next frame picks up anything that
    // landed in between. Re-observing an element is a no-op.
    const frame = requestAnimationFrame(scan);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
