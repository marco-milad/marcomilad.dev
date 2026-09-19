import { cn } from "@/lib/cn";

export type ContainerWidth = "prose" | "content" | "wide" | "bleed";

const WIDTHS: Record<ContainerWidth, string> = {
  prose: "max-w-prose px-gutter",
  content: "max-w-content px-gutter",
  wide: "max-w-wide px-gutter",
  bleed: "max-w-none",
};

export function Container({
  width = "content",
  className,
  children,
}: {
  width?: ContainerWidth;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full", WIDTHS[width], className)}>
      {children}
    </div>
  );
}
