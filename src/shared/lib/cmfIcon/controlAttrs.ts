import type { CmfIconControlAttrs } from './types/controlAttrs.types';

/**
 * Previously mirrored `data-cmf-icon-src` onto Button / ActionIcon roots for SVG menus.
 * That collided with `[data-cmf-icon-src]` media sizing (control collapsed to icon box).
 * Attr belongs only on CmfIcon / media nodes — keep this as a no-op for call-site stability.
 */
export function cmfIconControlAttrs(src?: string, showItemImg?: boolean): CmfIconControlAttrs {
  void src;
  void showItemImg;
  return {};
}
