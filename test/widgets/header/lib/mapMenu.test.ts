import { describe, expect, it } from 'vitest';

import { mapItem } from '@/widgets/header/lib/mapMenu';

describe('mapItem', () => {
  it('drops type for special block keys', () => {
    expect(mapItem({ key: 'search', name: '', url: '', type: 'link' })).toEqual({
      key: 'search',
      name: '',
      url: '',
    });

    expect(mapItem({ key: 'wallet', name: '', url: '', type: 'button' })).toEqual({
      key: 'wallet',
      name: '',
      url: '',
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
});
