/** Non-empty trimmed string, else `fallback`. Used for open settings keys (`layout`, `type`). */
export function readSettingsKey(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}
