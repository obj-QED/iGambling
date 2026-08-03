import type { HeaderMenuItem } from '@/widgets/header/types';

import { describe, expect, it } from 'vitest';

import {
  filterRenderableItems,
  filterRenderableMenu,
  hasItemImg,
  isDeepPanelItemEligible,
  isIconOnlyItem,
  isRenderableItem,
  menuItemDataAttrs,
  menuItemDropdownDataAttrs,
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
    expect(isRenderableItem({ key: 'x', name: '   ', url: '', img: '  ' })).toBe(true);
  });

  it('allows config-only special blocks without name and img', () => {
    expect(isRenderableItem({ key: 'color_scheme', name: '', url: '' })).toBe(true);
  });
});

describe('isDeepPanelItemEligible', () => {
  it('requires name or img — no config-only bypass', () => {
    expect(isDeepPanelItemEligible({ key: 'a', name: 'A', url: '' })).toBe(true);
    expect(isDeepPanelItemEligible({ key: 'b', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(isDeepPanelItemEligible({ key: 'color_scheme', name: '', url: '' })).toBe(false);
    expect(isDeepPanelItemEligible({ key: 'x', name: '', url: '' })).toBe(false);
  });
});

describe('isIconOnlyItem', () => {
  it('is true when only img is present', () => {
    expect(isIconOnlyItem({ key: 'logo', name: '', url: '/', img: '/logo.png' })).toBe(true);
    expect(isIconOnlyItem({ key: 'logo', name: 'Logo', url: '/', img: '/logo.png' })).toBe(false);
  });
});

describe('resolveItemLabel', () => {
  it('prefers name and falls back to key (ignores HTML tooltip label)', () => {
    expect(resolveItemLabel({ key: 'search', name: ' Search ', url: '' })).toBe(' Search ');
    expect(resolveItemLabel({ key: 'search', name: '', url: '' })).toBe('search');
    expect(
      resolveItemLabel({
        key: 'logo',
        name: 'Logo',
        url: '/',
        label: 'Tooltip <b>HTML</b> copy',
      }),
    ).toBe('Logo');
  });
});

describe('hasItemImg', () => {
  it('detects non-empty img', () => {
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '/i.png' })).toBe(true);
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '  ' })).toBe(true);
    expect(hasItemImg({ key: 'a', name: '', url: '', img: '' })).toBe(false);
  });
});

describe('menuItemDataAttrs', () => {
  it('adds CMF scope and api-type for menu items', () => {
    expect(menuItemDataAttrs({ key: 'promo', name: 'Promo', url: '/', type: 'link' })).toEqual({
      'data-cmf-component': 'header',
      'data-cmf-key': 'promo',
      'api-type': 'link',
    });
    expect(
      menuItemDataAttrs({ key: 'sign_up', name: 'Sign Up', url: '/', type: 'button' }),
    ).toEqual({
      'data-cmf-component': 'header',
      'data-cmf-key': 'sign_up',
      'api-type': 'button',
    });
  });

  it('adds CMF scope for special blocks without api-type when unset', () => {
    expect(menuItemDataAttrs({ key: 'search', name: '', url: '' })).toEqual({
      'data-cmf-component': 'header',
      'data-cmf-key': 'search',
    });
  });
});

describe('menuItemDropdownDataAttrs', () => {
  it('uses header-dropdown component scope (independent from bar header)', () => {
    expect(
      menuItemDropdownDataAttrs({ key: 'casino', name: 'Casino', url: '/casino', type: 'link' }),
    ).toEqual({
      'data-cmf-component': 'header-dropdown',
      'data-cmf-key': 'casino',
      'api-type': 'link',
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
