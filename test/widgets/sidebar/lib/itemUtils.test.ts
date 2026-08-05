import type { HeaderMenuItem } from '@/widgets/header';

import { describe, expect, it } from 'vitest';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import {
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  shouldRenderMenuItem,
} from '@/widgets/sidebar/lib';

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

describe('resolveCmfScope + controlAttrs (sidebar)', () => {
  const casino: HeaderMenuItem = {
    key: 'casino',
    name: 'Casino',
    url: '/casino',
    type: 'link',
  };

  it('parent trigger uses sidebar-dropdown + role parent', () => {
    expect(
      controlAttrs(
        casino,
        resolveCmfScope(casino, { widget: 'sidebar', chrome: 'dropdown', role: 'parent' }),
      ),
    ).toMatchObject({
      'data-cmf-component': 'sidebar-dropdown',
      'data-cmf-key': 'casino',
      'data-cmf-role': 'parent',
    });
  });

  it('accepts arbitrary dropdown role keys', () => {
    expect(
      controlAttrs(casino, resolveCmfScope(casino, { widget: 'sidebar', role: 'section-header' })),
    ).toMatchObject({
      'data-cmf-component': 'sidebar-dropdown',
      'data-cmf-role': 'section-header',
    });
  });

  it('maps trigger/item to parent/child by default', () => {
    expect(
      controlAttrs(
        casino,
        resolveCmfScope(casino, { widget: 'sidebar', chrome: 'dropdown', role: 'parent' }),
      )['data-cmf-role'],
    ).toBe('parent');
    expect(
      controlAttrs(
        casino,
        resolveCmfScope(casino, { widget: 'sidebar', chrome: 'dropdown', role: 'child' }),
      )['data-cmf-role'],
    ).toBe('child');
    expect(
      controlAttrs(casino, resolveCmfScope(casino, { widget: 'sidebar' }))['data-cmf-component'],
    ).toBe('sidebar');
  });

  it('chrome header/footer use sidebar-header / sidebar-footer', () => {
    expect(
      controlAttrs(casino, resolveCmfScope(casino, { widget: 'sidebar', chrome: 'header' })),
    ).toMatchObject({
      'data-cmf-component': 'sidebar-header',
      'data-cmf-key': 'casino',
    });
    expect(
      controlAttrs(casino, resolveCmfScope(casino, { widget: 'sidebar', chrome: 'footer' })),
    ).toMatchObject({
      'data-cmf-component': 'sidebar-footer',
      'data-cmf-key': 'casino',
    });
  });
});
