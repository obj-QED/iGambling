import type { HeaderMenuItem } from '@/widgets/header/types';

import { STORYBOOK_DEMO_ICON, storybookPublicUrl } from '@/storybook/lib';

/** Stable assets for Storybook menu item demos (`public/` via BASE_URL). */
const STORYBOOK_LOGO = STORYBOOK_DEMO_ICON;

export const HEADER_MENU_ITEM_FIXTURES = {
  iconOnlyLink: {
    key: 'profile',
    name: '',
    url: '/profile',
    img: STORYBOOK_LOGO,
    type: 'link',
  },
  textButton: {
    key: 'promo',
    name: 'Promo',
    url: '/promo',
    type: 'button',
  },
  iconAndText: {
    key: 'casino',
    name: 'Casino',
    url: '/',
    img: STORYBOOK_LOGO,
    type: 'link',
  },
  dropdownProfile: {
    key: 'profile',
    name: '',
    url: '',
    img: STORYBOOK_LOGO,
    type: 'link',
    items: [
      { key: 'deposit', name: 'Deposit', url: '/deposit' },
      { key: 'info', name: 'Profile info', url: '/profile?tab=info' },
    ],
  },
  brokenImgWithName: {
    key: 'bonus',
    name: 'Bonus',
    url: '/bonus',
    img: storybookPublicUrl('missing-menu-image.webp'),
    type: 'button',
  },
} as const satisfies Record<string, HeaderMenuItem>;

export type HeaderMenuItemFixtureKey = keyof typeof HEADER_MENU_ITEM_FIXTURES;

export function getHeaderMenuItemFixture(key: HeaderMenuItemFixtureKey): HeaderMenuItem {
  return HEADER_MENU_ITEM_FIXTURES[key];
}
