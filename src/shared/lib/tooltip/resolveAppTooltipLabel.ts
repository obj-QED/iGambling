import { createElement, type ReactElement, type ReactNode } from 'react';

/** True when tooltip copy is usable (non-empty string or non-string node). */
export function hasTooltipLabel(label: ReactNode): boolean {
  if (label == null || label === false) return false;
  if (typeof label === 'string') return label.trim().length > 0;
  return true;
}

/**
 * Tooltip strings may contain HTML (`<br>`, `<b>`, …) from menu API.
 * Plain text still renders correctly; React nodes pass through unchanged.
 */
export function toTooltipHtmlLabel(html: string): ReactElement {
  return createElement('span', {
    dangerouslySetInnerHTML: { __html: html },
  });
}

/**
 * Menu tooltip copy: `label` wins, else `name`.
 * Empty / whitespace-only strings are skipped.
 * String copy is rendered as HTML (global for AppTooltip).
 */
export function resolveAppTooltipLabel(
  label: ReactNode | undefined,
  name?: string,
): ReactNode | undefined {
  if (hasTooltipLabel(label)) {
    return typeof label === 'string' ? toTooltipHtmlLabel(label.trim()) : label;
  }
  const fromName = name?.trim() ?? '';
  return fromName.length > 0 ? toTooltipHtmlLabel(fromName) : undefined;
}
