/** Returns `value` when it is a member of `allowed`; otherwise `undefined`. */
export function pickOptionalUnionValue<T extends string>(
  allowed: readonly T[],
  value: string | undefined,
): T | undefined {
  if (value !== undefined && (allowed as readonly string[]).includes(value)) {
    return value as T;
  }

  return undefined;
}
