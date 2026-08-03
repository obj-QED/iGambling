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

  it('uses outline for button items', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'button' })).toBe('outline');
  });

  it('defaults missing type to link (transparent)', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home' })).toBe('transparent');
  });

  it('defaults unknown type to link (transparent)', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'custom' })).toBe('transparent');
  });

  it('prefers explicit variant over type and exception keys', () => {
    expect(resolveMenuItemButtonVariant({ key: 'home', type: 'button', variant: 'light' })).toBe(
      'light',
    );
    expect(resolveMenuItemButtonVariant({ key: 'timer', type: 'link', variant: 'subtle' })).toBe(
      'subtle',
    );
  });

  it('uses exception-{key} for special scroll blocks', () => {
    expect(resolveMenuItemButtonVariant({ key: 'timer', type: 'link' })).toBe('exception-timer');
    expect(resolveMenuItemButtonVariant({ key: 'wheel_mdl', type: 'link' })).toBe(
      'exception-wheel_mdl',
    );
    expect(resolveMenuItemButtonVariant({ key: 'search_leftmenu', type: 'link' })).toBe(
      'exception-search_leftmenu',
    );
  });

  it('never uses exception-{key} for action icons', () => {
    expect(resolveMenuItemActionIconVariant({ key: 'wheel_mdl', type: 'link' })).toBe(
      'transparent',
    );
    expect(resolveMenuItemActionIconVariant({ key: 'home', type: 'button' })).toBe('outline');
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
