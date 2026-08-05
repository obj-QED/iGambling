import type { HeaderMenuItem } from '@/widgets/header/types';

import {
  STORYBOOK_DEMO_LOGO,
  STORYBOOK_TABLER,
  STORYBOOK_TABLER_GIFT,
  STORYBOOK_TABLER_USER,
  storybookPublicUrl,
} from '@/storybook/lib';

/** Stable assets for Storybook menu item demos (`public/` via BASE_URL). */
export const HEADER_MENU_ITEM_FIXTURES = {
  iconOnlyLink: {
    key: 'profile',
    name: '',
    url: '/profile',
    img: STORYBOOK_TABLER_USER,
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
    img: STORYBOOK_TABLER.spade,
    type: 'link',
  },
  iconAndTextFilled: {
    key: 'deposit',
    name: 'Deposit',
    url: '/deposit',
    img: STORYBOOK_TABLER.coin,
    type: 'button',
    variant: 'filled',
  },
  outlineLink: {
    key: 'tournaments',
    name: 'Tournaments',
    url: '/tournaments',
    img: STORYBOOK_TABLER.trophy,
    type: 'link',
    variant: 'outline',
  },
  dropdownProfile: {
    key: 'profile',
    name: '',
    url: '',
    img: STORYBOOK_TABLER_USER,
    type: 'link',
    items: [
      { key: 'deposit', name: 'Deposit', url: '/deposit', img: STORYBOOK_TABLER.coin },
      { key: 'info', name: 'Profile info', url: '/profile?tab=info', img: STORYBOOK_TABLER_USER },
    ],
  },
  brokenImgWithName: {
    key: 'bonus',
    name: 'Bonus',
    url: '/bonus',
    img: storybookPublicUrl('missing-menu-image.webp'),
    type: 'button',
  },
  logoMark: {
    key: 'logo',
    name: 'Casino',
    url: '/',
    img: STORYBOOK_DEMO_LOGO,
    type: 'link',
  },
  giftPromo: {
    key: 'bonus_box',
    name: 'Bonus',
    url: '/bonus',
    img: STORYBOOK_TABLER_GIFT,
    type: 'link',
  },
} as const satisfies Record<string, HeaderMenuItem>;

export type HeaderMenuItemFixtureKey = keyof typeof HEADER_MENU_ITEM_FIXTURES;

export function getHeaderMenuItemFixture(key: HeaderMenuItemFixtureKey): HeaderMenuItem {
  return HEADER_MENU_ITEM_FIXTURES[key];
}
