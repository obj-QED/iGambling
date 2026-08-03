import { describe, expect, it } from 'vitest';

import {
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
  resolveMenuItemExplicitVariant,
} from '@/widgets/header/lib/menuItemVariant';

describe('resolveMenuItemExplicitVariant', () => {
  it('returns trimmed variant or undefined', () => {
    expect(resolveMenuItemExplicitVariant({ variant: 'transparent' })).toBe('transparent');
    expect(resolveMenuItemExplicitVariant({ variant: '  outline  ' })).toBe('outline');
    expect(resolveMenuItemExplicitVariant({ variant: '   ' })).toBeUndefined();
    expect(resolveMenuItemExplicitVariant({})).toBeUndefined();
  });
});

describe('resolveMenuItemButtonVariant', () => {
  it('prefers explicit variant (including specials)', () => {
    expect(
      resolveMenuItemButtonVariant({ key: 'wallet', type: 'link', variant: 'transparent' }),
    ).toBe('transparent');
    expect(resolveMenuItemButtonVariant({ key: 'promo', type: 'button', variant: 'light' })).toBe(
      'light',
    );
  });

  it('uses transparent for link when no variant', () => {
    expect(resolveMenuItemButtonVariant({ key: 'wallet', type: 'link' })).toBe('transparent');
    expect(resolveMenuItemButtonVariant({ key: 'promo', type: 'link' })).toBe('transparent');
  });

  it('uses default for button / missing type when no variant', () => {
    expect(resolveMenuItemButtonVariant({ key: 'wallet', type: 'button' })).toBe('default');
    expect(resolveMenuItemButtonVariant({ key: 'promo' })).toBe('default');
  });
});

describe('resolveMenuItemActionIconVariant', () => {
  it('prefers explicit variant (including specials)', () => {
    expect(
      resolveMenuItemActionIconVariant({ key: 'wallet', type: 'link', variant: 'transparent' }),
    ).toBe('transparent');
  });

  it('uses transparent for link when no variant', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'wallet', type: 'link' })).toBe('transparent');
    expect(resolveMenuItemActionIconVariant({ key: 'home', type: 'link' })).toBe('transparent');
  });

  it('uses default for button / missing type when no variant', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'search', type: 'button' })).toBe('default');
    expect(resolveMenuItemActionIconVariant({ key: 'promo' })).toBe('default');
  });
});
