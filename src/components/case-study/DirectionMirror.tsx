"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { ImageAsset } from "@content/schema";

/**
 * The same screen in both directions.
 *
 * Below lg the two images are stacked and a slider wipes between them, which
 * is the only way to compare them honestly on a phone. From lg they sit side
 * by side, because comparing is easier when nothing has to be operated.
 *
 * The control is a real range input: keyboard-operable and labelled, with no
 * drag handlers of our own.
 */
export function DirectionMirror({
  ltr,
  rtl,
  tone = "paper",
}: {
  ltr: ImageAsset;
  rtl: ImageAsset;
  tone?: "paper" | "band";
}) {
  const [position, setPosition] = useState(50);
  const id = useId();

  const label = (asset: ImageAsset, text: string) => (
    <p
      className={
        tone === "band"
          ? "font-mono text-meta uppercase text-band-muted"
          : "font-mono text-meta uppercase text-ink-3"
      }
    >
      {text}
      {asset.locale ? ` · ${asset.locale.toUpperCase()}` : null}
    </p>
  );

  return (
    <div>
      {/* Phone and tablet: wipe comparison */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-figure border border-rule">
          <Image
            src={ltr.src}
            alt={ltr.alt}
            sizes="100vw"
            placeholder="blur"
            className="h-auto w-full"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <Image
              src={rtl.src}
              alt={rtl.alt}
              sizes="100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-y-0 w-px bg-accent"
            style={{ insetInlineStart: `${position}%` }}
          />
        </div>

        <label htmlFor={id} className="mt-4 block text-small text-ink-2">
          Drag to compare — English (left) and Arabic (right)
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="mt-2 w-full accent-accent"
        />
      </div>

      {/* Desktop: both at once */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-2">
        <div>
          {label(ltr, "Left to right")}
          <div className="mt-3 overflow-hidden rounded-figure border border-rule">
            <Image
              src={ltr.src}
              alt={ltr.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div>
          {label(rtl, "Right to left")}
          <div className="mt-3 overflow-hidden rounded-figure border border-rule">
            <Image
              src={rtl.src}
              alt={rtl.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
