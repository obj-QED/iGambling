/** Returns `value` when it is a member of `allowed`; otherwise `fallback`. */
export function pickUnionValue<T extends string>(
  allowed: readonly T[],
  value: T | undefined,
  fallback: T,
): T {
  if (value !== undefined && (allowed as readonly string[]).includes(value)) {
    return value;
  }

  return fallback;
}
