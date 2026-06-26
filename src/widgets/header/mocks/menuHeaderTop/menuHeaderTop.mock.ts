import type { MenuHeaderTopBlockMock } from './types';

export const MENU_HEADER_TOP_MOCK: MenuHeaderTopBlockMock = {
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
          name: 'Casino',
          key: 'logo',
          img: '/uploads/logo.png',
          type: 'link',
        },
        {
          url: 'search',
          name: 'Search',
          key: 'search',
          img: '',
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
          url: '',
          name: 'Wallet',
          key: 'wallet',
          img: '',
          type: 'link',
        },
        {
          url: '/profile?tab=info',
          name: '',
          key: 'profile',
          img: '/images/misc/default/header/icon_user.webp',
          type: 'link',
        },
        {
          url: '',
          name: 'bonus_box',
          key: 'bonus_box',
          img: '/uploads/bonuses/bonuses_box/base.webp',
          type: 'link',
        },
        {
          url: '/notification',
          name: 'Notification',
          key: 'notification',
          img: '/images/ui/default/header/default/notification.svg',
          type: 'link',
        },
      ],
    },
  ],
};
