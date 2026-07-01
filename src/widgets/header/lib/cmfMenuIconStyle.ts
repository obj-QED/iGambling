import type { HeaderMenuIconRadius, HeaderMenuIconShape } from '../types';

export const CMF_ICON_SHAPE_VAR = '--cmf-icon-shape';
export const CMF_ICON_RADIUS_MODE_VAR = '--cmf-icon-radius-mode';

export type CmfMenuIconStyle = {
  shape?: HeaderMenuIconShape;
  radiusMode?: HeaderMenuIconRadius;
};

function normalizeIconShape(raw: string): HeaderMenuIconShape | undefined {
  const value = raw.trim().toLowerCase();
  if (value === 'square') return 'square';
  if (value === 'rect' || value === 'rectangular') return 'rect';
  return undefined;
}

function normalizeIconRadiusMode(raw: string): HeaderMenuIconRadius | undefined {
  const value = raw.trim().toLowerCase();
  if (value === 'round' || value === 'full' || value === '100%') return 'round';
  if (value === 'sm' || value === '6px') return 'sm';
  return undefined;
}

/** Read resolved CMF icon shape/radius from a menu row scope (`[data-menu-key]` or header root). */
export function readCmfMenuIconStyle(scopeEl: HTMLElement | null): CmfMenuIconStyle {
  if (scopeEl === null) return {};

  const styles = getComputedStyle(scopeEl);
  return {
    shape: normalizeIconShape(styles.getPropertyValue(CMF_ICON_SHAPE_VAR)),
    radiusMode: normalizeIconRadiusMode(styles.getPropertyValue(CMF_ICON_RADIUS_MODE_VAR)),
  };
}

export function findMenuIconScope(fromEl: HTMLElement | null): HTMLElement | null {
  if (fromEl === null) return null;
  return fromEl.closest('[data-menu-key]') ?? fromEl.closest('[data-widget="header"]');
}
