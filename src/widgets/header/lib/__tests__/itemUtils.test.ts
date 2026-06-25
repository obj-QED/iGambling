import type { HeaderMenuItem } from '@/widgets/header/types';

import { describe, expect, it } from 'vitest';

import {
  filterRenderableItems,
  filterRenderableMenu,
  hasItemImg,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemLabel,
} from '@/widgets/header/lib/itemUtils';

describe('isRenderableItem', () => {
  it('allows name only, img only, and name + img', () => {
    expect(isRenderableItem({ key: 'a', name: 'Label', url: '' })).toBe(true);
    expect(isRenderableItem({ key: 'b', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(isRenderableItem({ key: 'c', name: 'Label', url: '', img: '/i.png' })).toBe(true);
  });

  it('rejects items without name and img', () => {
    expect(isRenderableItem({ key: 'x', name: '', url: '' })).toBe(false);
    expect(isRenderableItem({ key: 'x', name: '   ', url: '', img: '  ' })).toBe(false);
  });

  it('allows config-only special blocks without name and img', () => {
    expect(isRenderableItem({ key: 'color_scheme', name: '', url: '' })).toBe(true);
  });
});

describe('isIconOnlyItem', () => {
  it('is true when only img is present', () => {
    expect(isIconOnlyItem({ key: 'logo', name: '', url: '/', img: '/logo.png' })).toBe(true);
    expect(isIconOnlyItem({ key: 'logo', name: 'Logo', url: '/', img: '/logo.png' })).toBe(false);
  });
});

describe('resolveItemLabel', () => {
  it('prefers trimmed name and falls back to key', () => {
    expect(resolveItemLabel({ key: 'search', name: ' Search ', url: '' })).toBe('Search');
    expect(resolveItemLabel({ key: 'search', name: '', url: '' })).toBe('search');
  });
});

describe('hasItemImg', () => {
  it('detects non-empty img', () => {
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '  ' })).toBe(false);
  });
});

describe('filterRenderableMenu', () => {
  it('drops empty sections and invisible items', () => {
    const hidden: HeaderMenuItem = { key: 'hidden', name: '', url: '' };
    const menu = filterRenderableMenu({
      sections: [
        {
          key: 'empty',
          items: [hidden],
        },
        {
          key: 'visible',
          items: [{ key: 'search', name: '', url: '/s', img: '/s.svg' }],
        },
      ],
    });

    expect(menu.sections).toHaveLength(1);
    expect(menu.sections[0]?.key).toBe('visible');
    expect(menu.sections[0]?.items[0]?.key).toBe('search');
  });

  it('keeps dropdown only when trigger and children are visible', () => {
    const items = filterRenderableItems([
      {
        key: 'profile',
        name: 'Profile',
        url: 'profile',
        items: [
          { key: 'deposit', name: 'Deposit', url: '/deposit' },
          { key: 'ghost', name: '', url: '' },
        ],
      },
      {
        key: 'broken',
        name: '',
        url: '',
        items: [{ key: 'child', name: 'Child', url: '/child' }],
      },
    ]);

    expect(items).toHaveLength(1);
    expect(items[0]?.items).toHaveLength(1);
    expect(items[0]?.items?.[0]?.key).toBe('deposit');
  });
});
