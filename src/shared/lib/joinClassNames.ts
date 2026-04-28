/** Joins class names; empty and falsy values are dropped. */
export function joinClassNames(
  ...parts: Array<string | undefined | null | false>
): string {
  return parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');
}
