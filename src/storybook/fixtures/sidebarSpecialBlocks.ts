import type { HeaderMenuItem } from '@/widgets/header/types';

import { STORYBOOK_DEMO_LOGO, STORYBOOK_TABLER, STORYBOOK_TABLER_FLAME } from '@/storybook/lib';
import { sanitizeStorybookMenu } from '@/storybook/lib/sanitizeMenuMedia';
import { SIDEBAR_MENU_MOCK } from '@/widgets/sidebar/mocks/sidebarMenu.mock';

import { findHeaderMenuItem } from './headerMenu';

/** Stable fixtures for isolated sidebar special-block stories. */
export const SIDEBAR_SPECIAL_BLOCK_FIXTURES = {
  search_leftmenu: {
    key: 'search_leftmenu',
    name: 'Search',
    url: '/search?q=ice',
    img: '',
    type: 'link',
  },
  timer: {
    key: 'timer',
    name: 'Get free money',
    url: '/timer',
    img: STORYBOOK_TABLER_FLAME,
    type: 'link',
  },
  wheel_mdl: {
    key: 'wheel_mdl',
    name: 'Wheel of Fortune Bonus',
    url: '/wheel',
    img: STORYBOOK_TABLER.carousel,
    type: 'link',
  },
  aside_header_logo: {
    key: 'aside_header_logo',
    name: 'Casino',
    url: '/',
    img: STORYBOOK_DEMO_LOGO,
    type: 'link',
    menuIcon: true,
  },
} as const satisfies Record<string, HeaderMenuItem>;

export type SidebarSpecialBlockFixtureKey = keyof typeof SIDEBAR_SPECIAL_BLOCK_FIXTURES;

export function getSidebarSpecialBlockFixture(key: SidebarSpecialBlockFixtureKey): HeaderMenuItem {
  const sanitized = sanitizeStorybookMenu(SIDEBAR_MENU_MOCK);
  const fromMock = findHeaderMenuItem(sanitized, key);
  return fromMock ?? { ...SIDEBAR_SPECIAL_BLOCK_FIXTURES[key] };
}
