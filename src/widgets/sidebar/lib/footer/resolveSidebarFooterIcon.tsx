import type { MenuItem as HeaderMenuItem } from '@/entities/menu';
import type { ReactElement } from 'react';

import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';

type FooterIconProps = {
  size?: number | string;
  stroke?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

const FOOTER_ICON_BY_KEY: Record<string, (props: FooterIconProps) => ReactElement> = {
  change_account: (props) => <IconSwitchHorizontal {...props} />,
  switch_account: (props) => <IconSwitchHorizontal {...props} />,
  logout: (props) => <IconLogout {...props} />,
};

/** Stable footer glyph for known keys — returns an element, not a component type. */
export function renderSidebarFooterIcon(
  item: HeaderMenuItem,
  props: FooterIconProps = {},
): ReactElement | null {
  const key = item.key ?? '';
  if (!Object.hasOwn(FOOTER_ICON_BY_KEY, key)) return null;
  return FOOTER_ICON_BY_KEY[key]!(props);
}
