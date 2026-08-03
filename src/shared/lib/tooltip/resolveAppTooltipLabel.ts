import type { ReactNode } from 'react';

/** True when tooltip copy is usable (non-empty string or non-string node). */
export function hasTooltipLabel(label: ReactNode): boolean {
  if (label == null || label === false) return false;
  if (typeof label === 'string') return label.trim().length > 0;
  return true;
}

/**
 * Menu tooltip copy: `label` wins, else `name`.
 * Empty / whitespace-only strings are skipped.
 */
export function resolveAppTooltipLabel(
  label: ReactNode | undefined,
  name?: string,
): ReactNode | undefined {
  if (hasTooltipLabel(label)) {
    return typeof label === 'string' ? label.trim() : label;
  }
  const fromName = name?.trim() ?? '';
  return fromName.length > 0 ? fromName : undefined;
}
