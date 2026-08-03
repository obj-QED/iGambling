import type { HeaderMenuItem } from '@/widgets/header';

import { describe, expect, it } from 'vitest';

import {
  isIconOnlyItem,
  isRenderableItem,
  menuItemDropdownDataAttrs,
  resolveItemHref,
  resolveMenuItemCmfAttrs,
  shouldRenderMenuItem,
} from '@/widgets/sidebar/lib/itemUtils';

const iconOnlyItem: HeaderMenuItem = {
  key: 'home',
  name: '',
  url: '/',
  img: '/images/menu/left/white/home.webp',
  type: 'link',
};

describe('sidebar itemUtils visibility', () => {
  it('isRenderableItem is false when name and img are missing', () => {
    expect(isRenderableItem({ key: 'x', name: '', url: '#' })).toBe(false);
  });

  it('isRenderableItem is true when only img is present', () => {
    expect(isRenderableItem(iconOnlyItem)).toBe(true);
    expect(isIconOnlyItem(iconOnlyItem)).toBe(true);
  });

  it('shouldRenderMenuItem hides icon-only items after img error', () => {
    expect(shouldRenderMenuItem(iconOnlyItem, false)).toBe(true);
    expect(shouldRenderMenuItem(iconOnlyItem, true)).toBe(false);
  });

  it('shouldRenderMenuItem keeps items with name after img error', () => {
    const item: HeaderMenuItem = { ...iconOnlyItem, name: 'Home' };
    expect(shouldRenderMenuItem(item, true)).toBe(true);
  });

  it('resolveItemHref returns empty string when url is missing', () => {
    expect(resolveItemHref(undefined)).toBe('');
  });

  it('resolveItemHref does not rewrite relative paths', () => {
    expect(resolveItemHref('profile')).toBe('profile');
  });
});

describe('sidebar dropdown CMF attrs', () => {
  const casino: HeaderMenuItem = {
    key: 'casino',
    name: 'Casino',
    url: '/casino',
    type: 'link',
  };

  it('parent trigger uses sidebar-dropdown + role parent', () => {
    expect(menuItemDropdownDataAttrs(casino, 'parent')).toMatchObject({
      'data-cmf-component': 'sidebar-dropdown',
      'data-cmf-key': 'casino',
      'data-cmf-role': 'parent',
    });
  });

  it('accepts arbitrary dropdown role keys', () => {
    expect(menuItemDropdownDataAttrs(casino, 'section-header')['data-cmf-role']).toBe(
      'section-header',
    );
    expect(resolveMenuItemCmfAttrs(casino, { role: 'leaf' })['data-cmf-role']).toBe('leaf');
  });

  it('resolveMenuItemCmfAttrs maps trigger/item to parent/child by default', () => {
    expect(resolveMenuItemCmfAttrs(casino, { dropdownTrigger: true })['data-cmf-role']).toBe(
      'parent',
    );
    expect(resolveMenuItemCmfAttrs(casino, { dropdownItem: true })['data-cmf-role']).toBe('child');
    expect(resolveMenuItemCmfAttrs(casino)['data-cmf-component']).toBe('sidebar');
  });
});
