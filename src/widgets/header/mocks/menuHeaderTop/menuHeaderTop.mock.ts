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
      items: [
        {
          url: '/',
          name: 'logo',
          key: 'logo',
          img: '/uploads/logo.png',
        },
        {
          url: 'search',
          name: 'search',
          key: 'search',
          img: '',
        },
      ],
    },
    {
      url: '#',
      name: 'block1',
      key: 'block1',
      img: '',
      items: [
        {
          url: 'wallet',
          name: 'wallet',
          key: 'wallet',
          img: '',
        },
        {
          url: 'profile?tab=info',
          name: 'profile',
          key: 'profile',
          img: '/images/misc/default/header/icon_user.webp',
          items: [
            {
              url: 'profile?tab=info',
              name: 'profile',
              key: 'profile',
              img: '/images/misc/default/header/icon_user.webp',
            },
            {
              url: 'profile?tab=deposit',
              name: 'deposit',
              key: 'deposit',
              img: '',
            },
            {
              url: '/profile?tab=bonuses',
              name: 'bonuses',
              key: 'bonuses',
              img: '',
            },
          ],
        },
        {
          url: '',
          name: 'bonus_box',
          key: 'bonus_box',
          img: '/uploads/bonuses/bonuses_box/base.webp',
        },
        {
          url: '/notification',
          name: 'notification',
          key: 'notification',
          img: '/images/ui/default/header/default/notification.svg',
        },
      ],
    },
  ],
};
