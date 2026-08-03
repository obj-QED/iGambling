import { describe, expect, it } from 'vitest';

import { splitHeaderDropdownMenu } from '@/widgets/header/lib/splitHeaderDropdownMenu';

describe('splitHeaderDropdownMenu', () => {
  it('keeps specials outside and groups deep-menu leaves by section label', () => {
    const split = splitHeaderDropdownMenu({
      sections: [
        {
          key: 'block3',
          items: [
            { key: 'logo', name: 'Logo', img: '/logo.svg' },
            { key: 'home', name: '', img: '/uploads/jlogo.webp', url: '/' },
            { key: 'casino', name: 'Casino', url: '/casino' },
            { key: 'search', name: '', img: '/search.svg' },
            {
              key: 'more',
              name: 'More',
              items: [{ key: 'promo', name: 'Promo', url: '/promo' }],
            },
          ],
        },
        {
          key: 'block1',
          items: [
            { key: 'wallet', name: '', img: '/wallet.svg' },
            { key: 'notification', name: '', img: '/bell.svg' },
            { key: 'color_scheme', name: '', url: '' },
            { key: 'sign_in', name: 'Sign in', url: '/login' },
            { key: 'sign_up', name: 'Sign Up', url: '/signUp' },
          ],
        },
      ],
    });

    expect(split.outsideMenu.sections).toEqual([
      {
        key: 'block3',
        items: [
          { key: 'logo', name: 'Logo', img: '/logo.svg', items: undefined },
          { key: 'search', name: '', img: '/search.svg', items: undefined },
        ],
      },
      {
        key: 'block1',
        items: [
          { key: 'wallet', name: '', img: '/wallet.svg', items: undefined },
          { key: 'notification', name: '', img: '/bell.svg', items: undefined },
          { key: 'color_scheme', name: '', url: '', items: undefined },
        ],
      },
    ]);

    expect(split.dropdownGroups).toEqual([
      {
        key: 'block3',
        label: 'block3',
        items: [
          { key: 'home', name: '', img: '/uploads/jlogo.webp', url: '/' },
          { key: 'casino', name: 'Casino', url: '/casino' },
          { key: 'promo', name: 'Promo', url: '/promo' },
        ],
      },
      {
        key: 'block1',
        label: 'block1',
        items: [
          { key: 'sign_in', name: 'Sign in', url: '/login' },
          { key: 'sign_up', name: 'Sign Up', url: '/signUp' },
        ],
      },
    ]);
  });

  it('excludes empty rows without name or img from deep menu', () => {
    const split = splitHeaderDropdownMenu({
      sections: [
        {
          key: 'block',
          items: [
            { key: 'color_scheme', name: '', url: '' },
            { key: 'empty', name: '', url: '/x' },
            { key: 'ok', name: 'Ok', url: '/ok' },
          ],
        },
      ],
    });

    expect(split.outsideMenu.sections[0]?.items.map((item) => item.key)).toEqual(['color_scheme']);
    expect(split.dropdownGroups).toEqual([
      {
        key: 'block',
        label: 'block',
        items: [{ key: 'ok', name: 'Ok', url: '/ok' }],
      },
    ]);
  });
});
