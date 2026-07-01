import { describe, expect, it } from 'vitest';

import { resolveMenuItemButtonVariant } from '@/widgets/sidebar/lib/menuItemVariant';

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
});
