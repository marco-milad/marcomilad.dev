/** Join class names; drops false/null/undefined. No dependency needed. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
