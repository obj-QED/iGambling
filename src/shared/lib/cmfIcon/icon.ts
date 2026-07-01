import type {
  CmfIconDataAttrs,
  CmfIconStyle,
  ResolveCmfIconRadiusDefaults,
  ResolveCmfIconRadiusItem,
  ResolveCmfIconShapeDefaults,
  ResolveCmfIconShapeItem,
} from './types';
import type { CmfIconRadius, CmfIconShape } from '@/shared/types/cmfIcon.types';

const SVG_MEDIA_PATTERN = /\.svg(?:\?|#|$)/i;

export function isSvgMediaSrc(src: string): boolean {
  return SVG_MEDIA_PATTERN.test(src);
}

function isKnownIconShape(value: string | undefined): value is CmfIconShape {
  return value === 'square' || value === 'rect';
}

function isKnownIconRadius(value: string | undefined): value is CmfIconRadius {
  return value === 'round' || value === 'sm';
}

export function resolveCmfIconShape(
  item: ResolveCmfIconShapeItem,
  defaults: ResolveCmfIconShapeDefaults,
  cmfStyle?: CmfIconStyle,
): CmfIconShape {
  if (isKnownIconShape(item.imgShape)) return item.imgShape;
  return cmfStyle?.shape ?? defaults.menuIconShape ?? 'square';
}

export function resolveCmfIconRadius(
  item: ResolveCmfIconRadiusItem,
  defaults: ResolveCmfIconRadiusDefaults,
  cmfStyle?: CmfIconStyle,
): CmfIconRadius {
  if (isKnownIconRadius(item.imgRadius)) return item.imgRadius;
  return cmfStyle?.radiusMode ?? defaults.menuIconRadius ?? 'sm';
}

export function cmfIconDataAttrs(
  src: string,
  shape: CmfIconShape,
  radius: CmfIconRadius,
): CmfIconDataAttrs {
  return {
    'data-cmf-icon-src': src,
    'data-cmf-icon-shape': shape,
    'data-cmf-icon-radius': radius,
  };
}

/** @deprecated Use `resolveCmfIconShape` */
export const resolveMenuItemIconShape = resolveCmfIconShape;

/** @deprecated Use `resolveCmfIconRadius` */
export const resolveMenuItemIconRadius = resolveCmfIconRadius;

/** @deprecated Use `cmfIconDataAttrs` */
export const menuItemIconDataAttrs = cmfIconDataAttrs;
