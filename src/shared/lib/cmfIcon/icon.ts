import type {
  CmfIconDataAttrs,
  CmfIconStyle,
  ResolveCmfIconRadiusItem,
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

/** item.imgShape → CSS cascade (`--cmf-icon-shape`) → square */
export function resolveCmfIconShape(
  item: ResolveCmfIconShapeItem,
  cmfStyle?: CmfIconStyle,
): CmfIconShape {
  if (isKnownIconShape(item.imgShape)) return item.imgShape;
  return cmfStyle?.shape ?? 'square';
}

/** item.imgRadius → CSS cascade (`--cmf-icon-radius-mode`) → sm */
export function resolveCmfIconRadius(
  item: ResolveCmfIconRadiusItem,
  cmfStyle?: CmfIconStyle,
): CmfIconRadius {
  if (isKnownIconRadius(item.imgRadius)) return item.imgRadius;
  return cmfStyle?.radiusMode ?? 'sm';
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
