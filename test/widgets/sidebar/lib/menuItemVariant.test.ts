import { describe, expect, it } from 'vitest';

import {
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
  });
});
