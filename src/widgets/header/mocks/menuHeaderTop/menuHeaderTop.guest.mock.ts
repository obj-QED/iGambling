import type { MenuHeaderTopBlockMock } from './types';

/** Header menu mock for guest (no session / token). */
export const MENU_HEADER_TOP_GUEST_MOCK: MenuHeaderTopBlockMock = {
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
          img: import.meta.env.VITE_APP_URL + '/uploads/logo.png',
          type: 'link',
        },
        {
          url: '/',
          name: '',
          key: 'home',
          img: '/uploads/jlogo.webp',
          type: 'link',
        },
        {
          url: '/',
          name: 'Casino',
          key: 'casino',
          img: '/uploads/logo.png',
          type: 'link',
          variant: 'outline',
        },
        {
          name: '',
          label: 'Compact Search',
          key: 'search',
          img: 'public/icons/tabler/search.svg',
          variant: 'transparent',
        },
        {
          name: 'Wallet',
          key: 'wallet',
          img: 'public/icons/tabler/wallet.svg',
          type: 'link',
          variant: 'transparent',
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
          url: '/signIn',
          name: 'Sign In',
          key: 'sign_in',
          img: '',
          type: 'button',
        },
        {
          url: '/signUp',
          name: 'Sign Up',
          key: 'sign_up',
          img: '',
          type: 'button',
        },
      ],
    },
  ],
};
