import type { MenuHeaderTopBlockMock } from './types';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

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
          img: publicAssetUrl('/uploads/logo.png'),
          type: 'link',
        },
        {
          url: '/',
          name: '',
          key: 'home',
          img: publicAssetUrl('icons/tabler/home.svg'),
          type: 'link',
        },
        {
          url: '/',
          name: 'Casino',
          key: 'casino',
          img: publicAssetUrl('icons/tabler/spade.svg'),
          type: 'link',
          variant: 'outline',
        },
        {
          name: '',
          label: 'Compact Search',
          key: 'search',
          img: publicAssetUrl('icons/tabler/search.svg'),
          variant: 'transparent',
        },
        {
          name: 'Wallet',
          key: 'wallet',
          img: publicAssetUrl('icons/tabler/wallet.svg'),
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
