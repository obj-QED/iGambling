import type { HeaderMenuItem } from '@/widgets/header';
import type { ReactElement } from 'react';

import { createElement } from 'react';

import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';

type FooterIconProps = {
  size?: number | string;
  stroke?: number | string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

const FOOTER_ICON_BY_KEY: Record<string, (props: FooterIconProps) => ReactElement> = {
  change_account: (props) => createElement(IconSwitchHorizontal, props),
  switch_account: (props) => createElement(IconSwitchHorizontal, props),
  logout: (props) => createElement(IconLogout, props),
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
