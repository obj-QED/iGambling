import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

import { describe, expect, it } from 'vitest';

import { resolveHeaderActionCopy } from './headerActionLabels';

describe('resolveHeaderActionCopy', () => {
  it('uses API name when it differs from key', () => {
    const item: AppHeaderMenuItem = {
      url: '',
      name: 'Бонусы',
      key: 'bonus_box',
      img: '',
    };
    expect(resolveHeaderActionCopy(item, 'Bonuses')).toEqual({
      ariaLabel: 'Бонусы',
      visibleLabel: 'Бонусы',
    });
  });

  it('falls back to friendly label when name mirrors technical key', () => {
    const item: AppHeaderMenuItem = {
      url: '',
      name: 'bonus_box',
      key: 'bonus_box',
      img: '',
    };
    expect(resolveHeaderActionCopy(item, 'Bonuses')).toEqual({
      ariaLabel: 'Bonuses',
      visibleLabel: 'Bonuses',
    });
  });
});
