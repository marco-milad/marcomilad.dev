import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";
type Tone = "paper" | "band";

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-small",
  lg: "h-13 px-6",
};

function variantClasses(variant: Variant, tone: Tone): string {
  if (variant === "primary") {
    return tone === "band"
      ? "bg-band-fg text-band hover:bg-accent-on-band"
      : "bg-ink text-paper hover:bg-accent";
  }
  return tone === "band"
    ? "border border-band-muted text-band-fg hover:border-band-fg"
    : "border border-rule-strong text-ink hover:border-ink";
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Opens in a new tab and announces it. Use for PDFs and off-site links. */
  external?: boolean;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "lg",
    tone = "paper",
    className,
    children,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-figure font-medium",
    // Transform, never size: a button that grows on hover shifts whatever is
    // beside it, and a hover does not earn Chrome's recent-input grace.
    "transition-[color,background-color,border-color,transform] duration-200 ease-editorial",
    "hover:-translate-y-0.5 active:translate-y-0",
    SIZES[size],
    variantClasses(variant, tone),
    className,
  );

  if (props.href !== undefined) {
    const { href, external } = props;

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    tone: _tone,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
