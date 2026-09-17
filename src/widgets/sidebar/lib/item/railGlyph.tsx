import type { MenuItem as HeaderMenuItem } from '@/entities/menu';
import type { ReactElement } from 'react';

import { IconLogout, IconSwitchHorizontal, IconUserScan } from '@tabler/icons-react';

import { itemKey } from './key';

type RailGlyphProps = {
  size?: number | string;
  stroke?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/** Known-key Tabler marks for compact / slideout rail when `railMedia: 'glyph'`. */
const RAIL_GLYPH_BY_KEY: Record<string, (props: RailGlyphProps) => ReactElement> = {
  account: (props) => <IconUserScan {...props} />,
  change_account: (props) => <IconSwitchHorizontal {...props} />,
  switch_account: (props) => <IconSwitchHorizontal {...props} />,
  logout: (props) => <IconLogout {...props} />,
};

export function hasSidebarRailGlyph(item: HeaderMenuItem): boolean {
  return Object.hasOwn(RAIL_GLYPH_BY_KEY, itemKey(item));
}

/** Stable rail/compact glyph for known keys — element, not a component type. */
export function renderSidebarRailGlyph(
  item: HeaderMenuItem,
  props: RailGlyphProps = {},
): ReactElement | null {
  const key = itemKey(item);
  if (!Object.hasOwn(RAIL_GLYPH_BY_KEY, key)) return null;
  return RAIL_GLYPH_BY_KEY[key]!(props);
}
