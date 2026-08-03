import { describe, expect, it } from 'vitest';

import { readSettingsKey } from '@/shared/lib/coercion';

describe('readSettingsKey', () => {
  it('returns trimmed string or fallback', () => {
    expect(readSettingsKey('  compact  ', 'default')).toBe('compact');
    expect(readSettingsKey('', 'default')).toBe('default');
    expect(readSettingsKey('   ', 'container')).toBe('container');
    expect(readSettingsKey(undefined, 'container')).toBe('container');
    expect(readSettingsKey(12, 'default')).toBe('default');
  });
});
