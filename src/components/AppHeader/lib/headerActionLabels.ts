import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

type HeaderActionCopy = {
  ariaLabel: string;
  visibleLabel: string;
};

/**
 * Prefer API `name` when it looks like a real label (not the same as technical `key`).
 * Otherwise use the same fallback for screen readers and visible text (no raw keys in UI).
 */
export function resolveHeaderActionCopy(
  item: AppHeaderMenuItem,
  fallbackLabel: string,
): HeaderActionCopy {
  const raw = item.name?.trim();
  if (raw && raw !== item.key) {
    return { ariaLabel: raw, visibleLabel: raw };
  }
  return { ariaLabel: fallbackLabel, visibleLabel: fallbackLabel };
}
