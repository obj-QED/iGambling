import { describe, expect, it } from 'vitest';

import { resolveHeaderTypeStyles, TYPE_STYLE_REGISTRY } from '@/widgets/header/registry/typeStyles';

describe('resolveHeaderTypeStyles', () => {
  it('resolves default, custom, and dropdown modules', () => {
    expect(TYPE_STYLE_REGISTRY.default.root).toBeTruthy();
    expect(TYPE_STYLE_REGISTRY.custom.root).toBeTruthy();
    expect(TYPE_STYLE_REGISTRY.dropdown.root).toBeTruthy();
    expect(resolveHeaderTypeStyles('dropdown').root).toBe(TYPE_STYLE_REGISTRY.dropdown.root);
  });

  it('falls back to default for unknown type', () => {
    expect(resolveHeaderTypeStyles('unknown-skin').root).toBe(TYPE_STYLE_REGISTRY.default.root);
  });
});
