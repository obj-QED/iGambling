import { describe, expect, it } from 'vitest';

import { resolveHeaderTypePack, TYPE_PACK_REGISTRY } from '@/widgets/header/ui/type';

describe('resolveHeaderTypePack styles', () => {
  it('resolves default, custom, and dropdown modules', () => {
    expect(TYPE_PACK_REGISTRY.default.styles.root).toBeTruthy();
    expect(TYPE_PACK_REGISTRY.custom.styles.root).toBeTruthy();
    expect(TYPE_PACK_REGISTRY.dropdown.styles.root).toBeTruthy();
    expect(resolveHeaderTypePack('dropdown').styles.root).toBe(
      TYPE_PACK_REGISTRY.dropdown.styles.root,
    );
  });

  it('falls back to default for unknown type', () => {
    expect(resolveHeaderTypePack('unknown-skin').styles.root).toBe(
      TYPE_PACK_REGISTRY.default.styles.root,
    );
  });
});
