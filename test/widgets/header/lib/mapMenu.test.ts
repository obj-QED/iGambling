import { describe, expect, it } from 'vitest';

import { mapItem } from '@/widgets/header/lib/mapMenu';

describe('mapItem', () => {
  it('keeps type for special block keys (control variant: link/button)', () => {
    expect(mapItem({ key: 'search', name: '', url: '', type: 'link' })).toEqual({
      key: 'search',
      name: '',
      url: '',
      type: 'link',
    });

    expect(
      mapItem({
        key: 'wallet',
        name: 'wallet',
        url: '/',
        type: 'link',
        variant: 'transparent',
      }),
    ).toEqual({
      key: 'wallet',
      name: 'wallet',
      url: '/',
      type: 'link',
      variant: 'transparent',
    });
  });

  it('keeps type for default menu items', () => {
    expect(mapItem({ key: 'promo', name: 'Promo', url: '/promo', type: 'link' })).toEqual({
      key: 'promo',
      name: 'Promo',
      url: '/promo',
      type: 'link',
    });
  });

  it('keeps variant and label through mapping', () => {
    expect(
      mapItem({
        key: 'logout',
        name: 'Logout',
        url: '/logout',
        type: 'link',
        variant: 'filled',
        label: 'Sign out',
      }),
    ).toEqual({
      key: 'logout',
      name: 'Logout',
      url: '/logout',
      type: 'link',
      variant: 'filled',
      label: 'Sign out',
    });
  });
});
