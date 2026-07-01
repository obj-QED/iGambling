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

/** Read resolved CMF icon shape/radius from row scope (`[data-menu-key]` or widget root). */
export function readCmfIconStyle(scopeEl: HTMLElement | null): CmfIconStyle {
  if (scopeEl === null) return {};

  const styles = getComputedStyle(scopeEl);
  return {
    shape: normalizeIconShape(styles.getPropertyValue(CMF_ICON_SHAPE_VAR)),
    radiusMode: normalizeIconRadiusMode(styles.getPropertyValue(CMF_ICON_RADIUS_MODE_VAR)),
  };
}

export function findCmfIconScope(fromEl: HTMLElement | null): HTMLElement | null {
  if (fromEl === null) return null;

  return (
    fromEl.closest('[data-menu-key]') ??
    fromEl.closest('[data-widget="header"]') ??
    fromEl.closest('[data-widget="sidebar"]')
  );
}

/** @deprecated Use `readCmfIconStyle` */
export const readCmfMenuIconStyle = readCmfIconStyle;

/** @deprecated Use `findCmfIconScope` */
export const findMenuIconScope = findCmfIconScope;
