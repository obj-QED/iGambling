/** Maps Mantine `radius` prop to CSS length used in component vars. */
export function resolveMantineComponentRadius(radius: unknown, cmfFallback: string): string {
  if (radius === undefined) return cmfFallback;

  if (typeof radius === 'number') {
    return `calc(${radius} / 16 * 1rem * var(--mantine-scale))`;
  }

  return `var(--mantine-radius-${String(radius)}, var(--mantine-radius-md))`;
}
