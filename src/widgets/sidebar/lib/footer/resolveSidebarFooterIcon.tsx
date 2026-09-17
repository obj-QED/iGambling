import type { MenuItem as HeaderMenuItem } from '@/entities/menu';
import type { ReactElement } from 'react';

import { renderSidebarRailGlyph } from '../item/railGlyph';

type FooterIconProps = {
  size?: number | string;
  stroke?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/** Stable footer glyph for known keys — delegates to shared rail glyph map. */
export function renderSidebarFooterIcon(
  item: HeaderMenuItem,
  props: FooterIconProps = {},
): ReactElement | null {
  return renderSidebarRailGlyph(item, props);
}
