import { cn } from "@/lib/cn";
import { reveal } from "@/lib/reveal";

type Layer = {
  name: string;
  items: string[];
  note?: string;
};

/**
 * Architecture as real text in a CSS grid, not a picture of text.
 *
 * It reads as an ordered list to a screen reader, scales to any width, and
 * needs no diagramming library. Layers run as columns on desktop and stack
 * vertically on a phone, which is also the direction data flows.
 */
export function LayerDiagram({
  layers,
  tone = "paper",
}: {
  layers: Layer[];
  tone?: "paper" | "band";
}) {
  const band = tone === "band";

  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded-figure border",
        band ? "border-band-rule bg-band-rule" : "border-rule bg-rule",
        "md:grid-cols-2",
        layers.length >= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3",
      )}
      {...reveal(0)}
    >
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          className={cn(
            "flex flex-col gap-4 p-6",
            band ? "bg-band" : "bg-paper-raised",
          )}
          // Layers arrive in the direction the data flows through them, sliding
          // into the plate rather than fading onto it.
          {...reveal(index + 1, { fade: false, shift: 8 })}
        >
          <p
            className={cn(
              "font-mono text-meta uppercase",
              band ? "text-band-muted" : "text-ink-3",
            )}
          >
            {String(index + 1).padStart(2, "0")} — {layer.name}
          </p>

          <ul className="flex flex-col gap-2">
            {layer.items.map((item) => (
              <li key={item} className="text-small">
                {item}
              </li>
            ))}
          </ul>

          {layer.note ? (
            <p
              className={cn(
                "mt-auto border-t pt-4 text-small",
                band
                  ? "border-band-rule text-band-muted"
                  : "border-rule text-ink-3",
              )}
            >
              {layer.note}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
