import { describe, expect, it } from 'vitest';

import {
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
} from '@/widgets/header/lib/menuItemVariant';

describe('resolveMenuItemButtonVariant', () => {
  it('uses transparent for link items', () => {
    expect(resolveMenuItemButtonVariant({ key: 'promo', type: 'link' })).toBe('transparent');
  });

  it('keeps default variant for button items', () => {
    expect(resolveMenuItemButtonVariant({ key: 'promo', type: 'button' })).toBe('default');
    expect(resolveMenuItemButtonVariant({ key: 'promo' })).toBe('default');
  });
  it('ignores type for special blocks', () => {
    expect(resolveMenuItemButtonVariant({ key: 'search', type: 'link' })).toBe('default');
    expect(resolveMenuItemActionIconVariant({ key: 'wallet', type: 'link' })).toBe('default');
  });
});

describe('resolveMenuItemActionIconVariant', () => {
  it('uses transparent for link items', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'promo', type: 'link' })).toBe('transparent');
  });

  it('uses default for button items', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'promo', type: 'button' })).toBe('default');
    expect(resolveMenuItemActionIconVariant({ key: 'promo' })).toBe('default');
  });
});
