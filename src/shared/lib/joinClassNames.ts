/** Склеивает классы; пустые и falsy отбрасываются. */
export function joinClassNames(
  ...parts: Array<string | undefined | null | false>
): string {
  return parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');
}
