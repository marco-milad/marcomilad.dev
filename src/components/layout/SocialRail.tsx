"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@content/site";
import { cn } from "@/lib/cn";

/**
 * A rail of contact points that arrives once the hero is behind you.
 *
 * It is deliberately quiet: the hero already carries two calls to action, so
 * this is for the second half of a long page, where the footer is still a long
 * way down. On a phone it docks to the bottom edge as a pill instead of taking
 * a side, where there is no room to spare.
 *
 * While it is away it is `inert`, so it is out of the tab order and out of the
 * accessibility tree rather than merely transparent — a keyboard user should
 * not land on something nobody can see.
 */

type RailLink = { label: string; href: string; icon: React.ReactNode };

const ICON = "h-5 w-5";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={ICON}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05A4.17 4.17 0 0 1 17.6 8.7c4 0 4.74 2.5 4.74 5.77V21h-4v-5.64c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.2 1.46-2.2 2.98V21h-4V9Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={ICON}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.2-3.37-1.2-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={ICON}>
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01a9.9 9.9 0 0 0 9.9-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 1 1 6.98 3.86Zm4.51-6.15c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06a6.74 6.74 0 0 1-3.37-2.95c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.22.25-.85.83-.85 2.03 0 1.2.87 2.35.99 2.51.12.17 1.71 2.62 4.15 3.67 1.54.67 2.15.72 2.92.61.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={ICON}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

const LINKS: RailLink[] = [
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedInIcon /> },
  { label: "GitHub", href: site.links.github, icon: <GitHubIcon /> },
  { label: "WhatsApp", href: site.links.whatsapp, icon: <WhatsAppIcon /> },
];

const ITEM = cn(
  "inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-2",
  "transition-[color,background-color,transform] duration-base ease-editorial",
  "hover:-translate-y-0.5 hover:bg-paper-accent hover:text-accent-text",
  "lg:hover:-translate-y-0 lg:hover:-translate-x-0.5",
);

export function SocialRail() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // Past it, not merely away from it: scrolling up above the sentinel
        // and scrolling down past it both leave it un-intersecting.
        setShown(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // Scrolling alone leaves the keyboard where it was, several screens down.
    // Move the caret back to the top of the content so the next Tab continues
    // from where the eye now is.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Zero-height marker in normal flow: roughly one screen of hero. */}
      <div aria-hidden="true" className="relative h-0">
        <div ref={sentinel} className="absolute top-[70svh] h-px w-px" />
      </div>

      <div
        // max-lg and lg set disjoint properties on purpose. Writing this as a
        // base rule plus lg overrides put `bottom` in two utilities at once,
        // and Tailwind resolves those by stylesheet order, not by which is
        // more specific — the rail ended up pinned under the header.
        className={cn(
          "pointer-events-none fixed z-40 flex",
          "max-lg:inset-x-0 max-lg:bottom-[calc(0.75rem+env(safe-area-inset-bottom))] max-lg:justify-center",
          // From lg it takes the inline end instead — logical, so it would
          // follow the document if this ever became an RTL page.
          "lg:inset-y-0 lg:end-5 lg:flex-col lg:justify-center",
        )}
      >
        <div
          inert={!shown}
          className={cn(
            "pointer-events-auto flex items-center gap-1 rounded-full border border-rule",
            "bg-paper-raised/90 p-1 shadow-[0_2px_6px_rgba(20,19,17,0.06),0_16px_32px_-18px_rgba(20,19,17,0.45)] backdrop-blur",
            "transition-[opacity,transform] duration-slow ease-editorial",
            "lg:flex-col",
            shown
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0 lg:translate-x-4 lg:translate-y-0",
          )}
        >
          <nav aria-label="Elsewhere">
            <ul className="flex items-center gap-1 lg:flex-col">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ITEM}
                  >
                    {link.icon}
                    <span className="sr-only">
                      {link.label} (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <span
            aria-hidden="true"
            className="h-6 w-px bg-rule lg:h-px lg:w-6"
          />

          <button type="button" onClick={toTop} className={ITEM}>
            <ArrowUpIcon />
            <span className="sr-only">Back to top</span>
          </button>
        </div>
      </div>
    </>
  );
}
