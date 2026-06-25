import { describe, expect, it } from 'vitest';

import { isBlockRegistryKey, resolveBlockRegistryKey } from '../keys';

describe('block registry keys', () => {
  it('accepts known routing and special keys', () => {
    expect(isBlockRegistryKey('search')).toBe(true);
    expect(isBlockRegistryKey('menuDropdown')).toBe(true);
    expect(isBlockRegistryKey('default')).toBe(true);
  });

  it('falls back unknown item keys to default', () => {
    expect(isBlockRegistryKey('profile')).toBe(false);
    expect(resolveBlockRegistryKey('profile')).toBe('default');
  });
});
