import type { MenuItem as HeaderMenuItem, MenuItemRailMedia } from '@/entities/menu';

import { resolveItemNameInitial } from './label';
import { hasSidebarRailGlyph } from './railGlyph';

export type { MenuItemRailMedia };

export const SIDEBAR_RAIL_MEDIA = ['img', 'initial', 'glyph'] as const;

/**
 * Resolve which mark to show when the row label is unavailable
 * (compact ActionIcon / slideout rail).
 *
 * Explicit `item.railMedia` wins when still satisfiable; otherwise fall through:
 * `img` → `glyph` (known key) → `initial`.
 */
export function resolveSidebarRailMedia(item: HeaderMenuItem, hasImg: boolean): MenuItemRailMedia {
  const override = item.railMedia;

  if (override === 'img') {
    if (hasImg) return 'img';
  } else if (override === 'initial') {
    if (resolveItemNameInitial(item) !== null) return 'initial';
  } else if (override === 'glyph') {
    if (hasSidebarRailGlyph(item)) return 'glyph';
  }

  if (hasImg) return 'img';
  if (hasSidebarRailGlyph(item)) return 'glyph';
  return 'initial';
}
