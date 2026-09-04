import type { CmfIconStyle } from './types';
import type { CmfIconRadius, CmfIconShape } from '@/shared/types/cmfIcon.types';

export const CMF_ICON_SHAPE_VAR = '--cmf-icon-shape';
export const CMF_ICON_RADIUS_MODE_VAR = '--cmf-icon-radius-mode';

function normalizeIconShape(raw: string): CmfIconShape | undefined {
  const value = raw.trim().toLowerCase();
  if (value === 'square') return 'square';
  if (value === 'rect' || value === 'rectangular') return 'rect';
  return undefined;
}

function normalizeIconRadiusMode(raw: string): CmfIconRadius | undefined {
  const value = raw.trim().toLowerCase();
  if (value === 'round' || value === 'full' || value === '100%') return 'round';
  if (value === 'sm' || value === '6px') return 'sm';
  return undefined;
}

/** Read resolved CMF icon shape/radius from row scope (`[data-cmf-key]` or widget root). */
export function readCmfIconStyle(scopeEl: HTMLElement | null): CmfIconStyle {
  if (scopeEl === null) return {};

  const styles = getComputedStyle(scopeEl);
  return {
    shape: normalizeIconShape(styles.getPropertyValue(CMF_ICON_SHAPE_VAR)),
    radiusMode: normalizeIconRadiusMode(styles.getPropertyValue(CMF_ICON_RADIUS_MODE_VAR)),
  };
}

/** Walk up from icon node (img / svg) to the nearest CMF / widget scope. */
export function findCmfIconScope(fromEl: Element | null): HTMLElement | null {
  if (fromEl === null) return null;

  const scope =
    fromEl.closest('[data-cmf-key]') ??
    fromEl.closest('[data-widget="header"]') ??
    fromEl.closest('[data-widget="sidebar"]');

  return scope instanceof HTMLElement ? scope : null;
}
