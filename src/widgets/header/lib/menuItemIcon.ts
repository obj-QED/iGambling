import type {
  HeaderConfig,
  HeaderMenuIconRadius,
  HeaderMenuIconShape,
  HeaderMenuItem,
} from '../types';
import type { CmfMenuIconStyle } from './cmfMenuIconStyle';

const SVG_MEDIA_PATTERN = /\.svg(?:\?|#|$)/i;

export function isSvgMediaSrc(src: string): boolean {
  return SVG_MEDIA_PATTERN.test(src);
}

function isKnownIconShape(value: string | undefined): value is HeaderMenuIconShape {
  return value === 'square' || value === 'rect';
}

function isKnownIconRadius(value: string | undefined): value is HeaderMenuIconRadius {
  return value === 'round' || value === 'sm';
}

export function resolveMenuItemIconShape(
  item: Pick<HeaderMenuItem, 'imgShape'>,
  config: Pick<HeaderConfig, 'menuIconShape'>,
  cmfStyle?: CmfMenuIconStyle,
): HeaderMenuIconShape {
  if (isKnownIconShape(item.imgShape)) return item.imgShape;
  return cmfStyle?.shape ?? config.menuIconShape ?? 'square';
}

export function resolveMenuItemIconRadius(
  item: Pick<HeaderMenuItem, 'imgRadius'>,
  config: Pick<HeaderConfig, 'menuIconRadius'>,
  cmfStyle?: CmfMenuIconStyle,
): HeaderMenuIconRadius {
  if (isKnownIconRadius(item.imgRadius)) return item.imgRadius;
  return cmfStyle?.radiusMode ?? config.menuIconRadius ?? 'sm';
}

export function menuItemIconDataAttrs(
  shape: HeaderMenuIconShape,
  radius: HeaderMenuIconRadius,
): {
  'data-menu-icon-shape': HeaderMenuIconShape;
  'data-menu-icon-radius': HeaderMenuIconRadius;
} {
  return {
    'data-menu-icon-shape': shape,
    'data-menu-icon-radius': radius,
  };
}
