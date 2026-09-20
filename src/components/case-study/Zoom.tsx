"use client";

import { useRef } from "react";

/**
 * Click-to-enlarge for dense screenshots (admin tables, analytics).
 * Native <dialog> again: focus trap, Escape and focus restore come free.
 */
export function Zoom({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group relative block w-full cursor-zoom-in text-start"
      >
        <span className="block overflow-hidden rounded-figure transition-transform duration-slow ease-editorial group-hover:scale-[1.01]">
          {children}
        </span>
        <span className="sr-only">Enlarge: {label}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 end-3 rounded-full border border-rule bg-paper/90 px-3 py-1 font-mono text-meta uppercase text-ink-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Enlarge
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="max-h-[92dvh] w-[min(96vw,1400px)] max-w-none bg-paper p-0 backdrop:bg-ink/70"
      >
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3">
            <p className="text-small text-ink-2">{label}</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-9 items-center rounded-figure border border-rule-strong px-3 text-small"
            >
              Close
            </button>
          </div>
          <div className="overflow-auto p-4">{full}</div>
        </div>
      </dialog>
    </>
  );
}
