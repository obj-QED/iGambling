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
