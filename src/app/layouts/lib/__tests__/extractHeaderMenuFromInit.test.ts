import type { PageMenuRootDto } from '@/shared/types/pageMenu';

import { describe, expect, it } from 'vitest';

import { extractHeaderMenuFromInit } from '@/app/layouts/lib/extractHeaderMenuFromInit';

import { mapRoot } from '@/widgets/header/lib/mapMenu';

const HEADER_ROOT: PageMenuRootDto = {
  url: '#',
  name: 'header',
  key: 'menuHeaderTop',
  items: [
    {
      key: 'block3',
      name: '',
      url: '',
      items: [
        { key: 'search', url: 'search', name: 'search' },
        { key: 'logo', url: '/', name: 'logo', img: '/uploads/logo.png' },
      ],
    },
    {
      key: 'block1',
      name: '',
      url: '',
      items: [
        {
          key: 'profile',
          url: 'profile',
          name: 'Profile',
          items: [{ key: 'deposit', url: 'profile?tab=deposit', name: 'Deposit' }],
        },
      ],
    },
  ],
};

describe('mapRoot', () => {
  it('maps parsed sections and nested items', () => {
    const menu = mapRoot(HEADER_ROOT);

    expect(menu).toEqual({
      sections: [
        {
          key: 'block3',
          items: [
            { key: 'search', url: 'search', name: 'search', img: undefined, items: undefined },
            {
              key: 'logo',
              url: '/',
              name: 'logo',
              img: '/uploads/logo.png',
              items: undefined,
            },
          ],
        },
        {
          key: 'block1',
          items: [
            {
              key: 'profile',
              url: 'profile',
              name: 'Profile',
              img: undefined,
              items: [{ key: 'deposit', url: 'profile?tab=deposit', name: 'Deposit' }],
            },
          ],
        },
      ],
    });
  });
});

describe('extractHeaderMenuFromInit', () => {
  it('reads page.blocks menuHeaderTop.menu', () => {
    const menu = extractHeaderMenuFromInit({
      page: {
        blocks: [
          {
            type: 'menuHeaderTop',
            menu: HEADER_ROOT.items,
          },
        ],
      },
    });

    expect(menu?.sections).toHaveLength(2);
    expect(menu?.sections[0]?.key).toBe('block3');
  });

  it('ignores legacy page.menu header entry', () => {
    const menu = extractHeaderMenuFromInit({
      page: {
        menu: [HEADER_ROOT],
      },
    });

    expect(menu).toBeNull();
  });

  it('returns null when menuHeaderTop block is missing', () => {
    expect(extractHeaderMenuFromInit({})).toBeNull();
  });
});
