export function isNonEmptyArray<T>(value: readonly T[] | undefined | null): value is readonly T[] {
  return value !== undefined && value !== null && value.length > 0;
}
