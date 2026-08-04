import type { HeaderMenuItem } from '@/widgets/header/types';

import { STORYBOOK_DEMO_ICON } from '@/storybook/lib';
import { SIDEBAR_MENU_MOCK } from '@/widgets/sidebar/mocks/sidebarMenu.mock';

import { findHeaderMenuItem } from './headerMenu';

const STORYBOOK_LOGO = STORYBOOK_DEMO_ICON;

/** Stable fixtures for isolated sidebar special-block stories. */
export const SIDEBAR_SPECIAL_BLOCK_FIXTURES = {
  search_leftmenu: {
    key: 'search_leftmenu',
    name: 'Search',
    url: '?search=ice',
    img: '',
    type: 'link',
  },
  timer: {
    key: 'timer',
    name: 'Get free money',
    url: '/timer',
    img: '/images/menu/left/999/fire_icon.svg',
    type: 'link',
  },
  wheel_mdl: {
    key: 'wheel_mdl',
    name: 'Wheel of Fortune Bonus',
    url: '/wheel',
    img: '/images/menu/left/999/wheel_md_mini.png',
    type: 'link',
  },
  aside_header_logo: {
    key: 'aside_header_logo',
    name: 'Casino',
    url: '/',
    img: STORYBOOK_LOGO,
    type: 'link',
    menuIcon: true,
  },
} as const satisfies Record<string, HeaderMenuItem>;

export type SidebarSpecialBlockFixtureKey = keyof typeof SIDEBAR_SPECIAL_BLOCK_FIXTURES;

export function getSidebarSpecialBlockFixture(key: SidebarSpecialBlockFixtureKey): HeaderMenuItem {
  const fromMock = findHeaderMenuItem(SIDEBAR_MENU_MOCK, key);
  return fromMock ?? SIDEBAR_SPECIAL_BLOCK_FIXTURES[key];
}
