import type { HeaderMenuItem } from '@/widgets/header/types';

import { describe, expect, it } from 'vitest';

import {
  filterRenderableItems,
  filterRenderableMenu,
  hasItemImg,
  isIconOnlyItem,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemLabel,
  resolveMenuItemTypeAttr,
} from '@/widgets/header/lib/itemUtils';

describe('isRenderableItem', () => {
  it('allows name only, img only, and name + img', () => {
    expect(isRenderableItem({ key: 'a', name: 'Label', url: '' })).toBe(true);
    expect(isRenderableItem({ key: 'b', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(isRenderableItem({ key: 'c', name: 'Label', url: '', img: '/i.png' })).toBe(true);
  });

  it('rejects items without name and img', () => {
    expect(isRenderableItem({ key: 'x', name: '', url: '' })).toBe(false);
    expect(isRenderableItem({ key: 'x', name: '   ', url: '', img: '  ' })).toBe(true);
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
  it('prefers name and falls back to key', () => {
    expect(resolveItemLabel({ key: 'search', name: ' Search ', url: '' })).toBe(' Search ');
    expect(resolveItemLabel({ key: 'search', name: '', url: '' })).toBe('search');
  });
});

describe('hasItemImg', () => {
  it('detects non-empty img', () => {
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '  ' })).toBe(true);
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '' })).toBe(false);
  });
});

describe('resolveMenuItemTypeAttr', () => {
  it('defaults to button when type is missing', () => {
    expect(resolveMenuItemTypeAttr({ key: 'promo', name: 'Promo', url: '/' })).toBe('button');
  });

  it('returns link when type is link', () => {
    expect(resolveMenuItemTypeAttr({ key: 'promo', name: 'Promo', url: '/', type: 'link' })).toBe(
      'link',
    );
  });
});

describe('menuItemDataAttrs', () => {
  it('adds CMF scope and data-menu-type for default menu items', () => {
    expect(menuItemDataAttrs({ key: 'promo', name: 'Promo', url: '/', type: 'link' })).toEqual({
      'data-cmf-component': 'header',
      'data-cmf-key': 'promo',
      'data-menu-key': 'promo',
      'data-menu-type': 'link',
    });
  });

  it('omits data-menu-type for special blocks', () => {
    expect(menuItemDataAttrs({ key: 'search', name: '', url: '' })).toEqual({
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
      'data-menu-key': 'search',
    });
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
