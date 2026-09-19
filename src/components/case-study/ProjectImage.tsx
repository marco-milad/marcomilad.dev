import Image from "next/image";
import type { ImageAsset } from "@content/schema";
import { Figure } from "@/components/ui/Figure";
import {
  BrowserFrame,
  DocumentFrame,
  PhoneFrame,
  Plate,
} from "@/components/ui/frames";
import { Zoom } from "./Zoom";

/**
 * The single place an ImageAsset becomes pixels: treatment picks the frame,
 * and the asset's own dir/sampleData flags become visible badges via Figure.
 */
export function ProjectImage({
  asset,
  tone = "paper",
  sizes = "(min-width: 1024px) 1000px, 100vw",
  priority = false,
  zoomable = false,
  number,
}: {
  asset: ImageAsset;
  tone?: "paper" | "band";
  sizes?: string;
  priority?: boolean;
  /** For dense screenshots that reward a closer look. */
  zoomable?: boolean;
  number?: string;
}) {
  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      sizes={sizes}
      placeholder="blur"
      priority={priority}
      className="h-auto w-full"
    />
  );

  let framed: React.ReactNode;
  switch (asset.treatment) {
    case "browser":
      framed = (
        <BrowserFrame url={asset.url} tone={tone}>
          {image}
        </BrowserFrame>
      );
      break;
    case "phone":
      framed = (
        <PhoneFrame tone={tone} className="mx-auto max-w-[19rem]">
          {image}
        </PhoneFrame>
      );
      break;
    case "plate":
      framed = <Plate tone={tone}>{image}</Plate>;
      break;
    case "document":
      framed = <DocumentFrame>{image}</DocumentFrame>;
      break;
    default:
      framed = (
        <div className="overflow-hidden rounded-figure border border-rule">
          {image}
        </div>
      );
  }

  const body = zoomable ? (
    <Zoom
      label={asset.caption ?? asset.alt}
      full={
        <Image
          src={asset.src}
          alt={asset.alt}
          sizes="96vw"
          placeholder="blur"
          className="h-auto w-full"
        />
      }
    >
      {framed}
    </Zoom>
  ) : (
    framed
  );

  return (
    <Figure
      caption={asset.caption}
      number={number}
      sampleData={asset.sampleData}
      rtl={asset.dir === "rtl"}
      tone={tone}
    >
      {body}
    </Figure>
  );
}
