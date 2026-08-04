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
    expect(resolveMenuItemButtonVariant({ type: 'link', variant: 'transparent' })).toBe(
      'transparent',
    );
    expect(resolveMenuItemButtonVariant({ type: 'button', variant: 'light' })).toBe('light');
  });

  it('uses transparent for link when no variant', () => {
    expect(resolveMenuItemButtonVariant({ type: 'link' })).toBe('transparent');
  });

  it('uses default for button / missing type when no variant', () => {
    expect(resolveMenuItemButtonVariant({ type: 'button' })).toBe('default');
    expect(resolveMenuItemButtonVariant({})).toBe('default');
  });
});

describe('resolveMenuItemActionIconVariant', () => {
  it('prefers explicit variant (including specials)', () => {
    expect(resolveMenuItemActionIconVariant({ type: 'link', variant: 'transparent' })).toBe(
      'transparent',
    );
  });

  it('uses transparent for link when no variant', () => {
    expect(resolveMenuItemActionIconVariant({ type: 'link' })).toBe('transparent');
  });

  it('uses default for button / missing type when no variant', () => {
    expect(resolveMenuItemActionIconVariant({ type: 'button' })).toBe('default');
    expect(resolveMenuItemActionIconVariant({})).toBe('default');
  });
});
