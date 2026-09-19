const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
] as const;

/**
 * Small counts read better as words in prose. Used so copy like "Five
 * products" is derived from the registry instead of being typed in and then
 * quietly going stale when a project is added.
 */
export function countWord(n: number, capitalise = false): string {
  const word = WORDS[n] ?? String(n);
  return capitalise ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
