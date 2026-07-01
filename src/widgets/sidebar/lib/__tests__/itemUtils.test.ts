import type { HeaderMenuItem } from '@/widgets/header';

import { describe, expect, it } from 'vitest';

import {
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  shouldRenderMenuItem,
} from '../itemUtils';

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
