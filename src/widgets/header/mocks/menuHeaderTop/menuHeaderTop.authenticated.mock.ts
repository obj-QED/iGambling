import type { MenuHeaderTopBlockMock } from './types';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

/** Header menu mock when user has a session (httpOnly token). */
export const MENU_HEADER_TOP_AUTHENTICATED_MOCK: MenuHeaderTopBlockMock = {
  skin: '',
  type: 'menuHeaderTop',
  menu: [
    {
      url: '#',
      name: 'block3',
      key: 'block3',
      img: '',
      type: null,
      items: [
        {
          url: '/',
          name: '',
          key: 'logo',
          img: publicAssetUrl('/uploads/logo.svg'),
          type: 'link',
        },
        {
          url: '/',
          name: 'Home',
          key: 'home',
          img: publicAssetUrl('icons/tabler/home.svg'),
          type: 'link',
        },
        {
          url: '/casino',
          name: 'Casino',
          key: 'casino',
          img: publicAssetUrl('icons/tabler/spade.svg'),
          type: 'link',
        },
        {
          url: '/live',
          name: 'Live',
          key: 'live_games',
          img: publicAssetUrl('icons/tabler/dice.svg'),
          type: 'link',
        },
        {
          url: '/sport',
          name: 'Sport',
          key: 'sport',
          img: publicAssetUrl('icons/tabler/trophy.svg'),
          type: 'link',
        },
        {
          url: '/search',
          name: 'Search',
          key: 'search',
          img: publicAssetUrl('icons/tabler/search.svg'),
          type: 'link',
        },
      ],
    },
    {
      url: '#',
      name: 'block1',
      key: 'block1',
      img: '',
      type: 'link',
      items: [
        {
          url: '/wallet',
          name: 'Wallet',
          key: 'wallet',
          img: publicAssetUrl('icons/tabler/wallet.svg'),
          type: 'link',
        },
        {
          url: '/profile?tab=info',
          name: '',
          key: 'profile',
          img: publicAssetUrl('icons/tabler/user.svg'),
          type: 'link',
        },
        {
          url: '/bonuses',
          name: 'bonus_box',
          key: 'bonus_box',
          img: publicAssetUrl('icons/tabler/gift.svg'),
          type: 'link',
        },
        {
          url: '/notification',
          name: 'Notification',
          key: 'notification',
          img: publicAssetUrl('icons/tabler/bell-ringing.svg'),
          type: 'link',
        },
      ],
    },
  ],
};
