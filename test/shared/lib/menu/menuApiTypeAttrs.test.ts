import { describe, expect, it } from 'vitest';

import { isMenuItemApiType, menuApiTypeAttrs } from '@/shared/lib/menu/menuApiTypeAttrs';

describe('menuApiTypeAttrs', () => {
  it('emits api-type for button and link', () => {
    expect(menuApiTypeAttrs('button')).toEqual({ 'api-type': 'button' });
    expect(menuApiTypeAttrs('link')).toEqual({ 'api-type': 'link' });
  });

  it('omits unknown or empty type', () => {
    expect(menuApiTypeAttrs(undefined)).toEqual({});
    expect(menuApiTypeAttrs(null)).toEqual({});
    expect(menuApiTypeAttrs('')).toEqual({});
    expect(menuApiTypeAttrs('dropdown')).toEqual({});
  });

  it('guards MenuItemApiType', () => {
    expect(isMenuItemApiType('button')).toBe(true);
    expect(isMenuItemApiType('link')).toBe(true);
    expect(isMenuItemApiType('other')).toBe(false);
  });
});
