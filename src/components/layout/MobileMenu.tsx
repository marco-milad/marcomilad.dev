"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav, site } from "@content/site";
import { Ar } from "@/components/ui/Ar";

/**
 * Full-screen menu on a native <dialog>: the browser gives us the focus trap,
 * Escape handling and focus restore, so no focus-management library is needed.
 * The menu is where Arabic gets room to be large and deliberate.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-figure border border-rule-strong px-4 text-small transition-colors duration-200 ease-editorial hover:border-ink"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span aria-hidden="true" className="flex flex-col gap-[3px]">
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
        </span>
        Menu
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => {
          setOpen(false);
          // Return focus to the trigger. The browser restores focus to the
          // invoker only if it is still the same element after the close, and
          // a re-render can lose that — so put it back explicitly.
          triggerRef.current?.focus();
        }}
        aria-label="Site menu"
        className="h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="menu-panel flex h-full flex-col px-gutter py-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-meta uppercase text-ink-3">
              {site.role}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center gap-2 rounded-figure border border-rule-strong px-4 text-small transition-colors duration-200 ease-editorial hover:border-ink"
            >
              <span aria-hidden="true" className="relative block h-3 w-3">
                <span className="absolute inset-x-0 top-1/2 block h-px rotate-45 bg-ink" />
                <span className="absolute inset-x-0 top-1/2 block h-px -rotate-45 bg-ink" />
              </span>
              Close
            </button>
          </div>

          <nav aria-label="Site" className="mt-block">
            <ul className="flex flex-col gap-8">
              {footerNav.map((item, index) => {
                const isActive =
                  !item.external &&
                  (pathname === item.href ||
                    pathname.startsWith(`${item.href}/`));

                // English at the line start, Arabic at the line end: the row
                // itself shows both directions, which reads as deliberate
                // rather than as a stray translation underneath.
                const inner = (
                  <span className="flex items-baseline justify-between gap-6 border-b border-rule pb-3">
                    <span className="text-h2">{item.label.en}</span>
                    {item.label.ar ? (
                      <Ar decorative className="ar-display text-h3 text-ink-3">
                        {item.label.ar.text}
                      </Ar>
                    ) : null}
                  </span>
                );

                return (
                  <li
                    key={item.href}
                    className="menu-item"
                    // The rows arrive in order, on the same ~70ms beat the
                    // rest of the site uses.
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onClick={() => setOpen(false)}
                      >
                        {inner}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="block"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* The desktop header carries the call to action; without this the
              phone menu was the one place on the site that did not. */}
          <div
            className="menu-item mt-auto flex flex-col gap-5 pt-block"
            style={{ animationDelay: `${footerNav.length * 70}ms` }}
          >
            <Link
              href={site.cta.href}
              onClick={() => setOpen(false)}
              className="inline-flex h-13 items-center justify-center rounded-figure bg-ink px-6 font-medium text-paper transition-colors duration-200 ease-editorial hover:bg-accent"
            >
              {site.cta.label.en}
            </Link>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-5 text-small">
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-meta break-all text-ink-2"
              >
                {site.email}
              </a>
              {[
                { label: "LinkedIn", href: site.links.linkedin },
                { label: "GitHub", href: site.links.github },
                { label: "WhatsApp", href: site.links.whatsapp },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-2 underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
