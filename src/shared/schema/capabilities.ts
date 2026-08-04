/**
 * Keep only keys whose capability is explicitly `true`.
 * Missing capability key → excluded (opt-in).
 */
export function filterKeysByCapabilities<TKey extends string>(
  keys: readonly TKey[],
  capabilities: Readonly<Partial<Record<TKey, boolean>>>,
): TKey[] {
  return keys.filter((key) => capabilities[key] === true);
}

/**
 * Whether a single capability is enabled (default `true` when unset).
 * Use for blocks that should remain on unless settings disable them.
 */
export function isCapabilityEnabled(
  capabilities: Readonly<Record<string, boolean>>,
  key: string,
  defaultEnabled = true,
): boolean {
  if (!Object.hasOwn(capabilities, key)) return defaultEnabled;
  return capabilities[key] === true;
}
