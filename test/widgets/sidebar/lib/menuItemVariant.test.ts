import { describe, expect, it } from 'vitest';

import {
  resolveLogoControlVariant,
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
} from '@/widgets/sidebar/lib/menuItemVariant';

describe('resolveMenuItemButtonVariant (sidebar)', () => {
  it('uses transparent for link items', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'link' })).toBe('transparent');
  });

  it('uses default for button items', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'button' })).toBe('default');
  });

  it('defaults missing type to link (transparent)', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home' })).toBe('transparent');
    expect(resolveMenuItemButtonVariant({ key: 'home' })).toBe('transparent');
  });

  it('defaults unknown type to link (transparent)', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'custom' })).toBe('transparent');
  });

  it('prefers explicit variant over type', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'button', variant: 'light' })).toBe(
      'light',
    );
    expect(resolveMenuItemButtonVariant({ key: 'timer', type: 'link', variant: 'subtle' })).toBe(
      'subtle',
    );
  });

  it('styles special blocks via data-cmf-key tokens — not exception-* variants', () => {
    expect(resolveMenuItemButtonVariant({ key: 'timer', type: 'link' })).toBe('transparent');
    expect(resolveMenuItemButtonVariant({ key: 'wheel_mdl', type: 'button' })).toBe('default');
    expect(resolveMenuItemButtonVariant({ key: 'search_leftmenu', type: 'link' })).toBe(
      'transparent',
    );
  });

  it('action icons follow type / explicit only', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'wheel_mdl', type: 'link' })).toBe(
      'transparent',
    );
    expect(resolveMenuItemActionIconVariant({ key: 'home', type: 'button' })).toBe('default');
    expect(
      resolveMenuItemActionIconVariant({ key: 'home', type: 'button', variant: 'filled' }),
    ).toBe('filled');
  });
});

describe('resolveLogoControlVariant', () => {
  it('defaults to transparent when variant is omitted', () => {
    expect(resolveLogoControlVariant({})).toBe('transparent');
    expect(resolveLogoControlVariant({ variant: '  ' })).toBe('transparent');
  });

  it('uses explicit variant', () => {
    expect(resolveLogoControlVariant({ variant: 'outline' })).toBe('outline');
    expect(resolveLogoControlVariant({ variant: 'light' })).toBe('light');
  });
});
