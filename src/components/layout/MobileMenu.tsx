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
        className="inline-flex h-11 items-center rounded-figure border border-rule-strong px-4 text-small"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
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
        <div className="flex h-full flex-col px-gutter py-6">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center rounded-figure border border-rule-strong px-4 text-small"
            >
              Close
            </button>
          </div>

          <nav aria-label="Site" className="mt-block">
            <ul className="flex flex-col gap-8">
              {footerNav.map((item) => {
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
                  <li key={item.href}>
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

          <div className="mt-auto pt-block">
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-small break-all text-ink-2"
            >
              {site.email}
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
