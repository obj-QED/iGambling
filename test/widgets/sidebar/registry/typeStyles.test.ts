import { describe, expect, it } from 'vitest';

import { resolveSidebarTypePack, TYPE_PACK_REGISTRY } from '@/widgets/sidebar/ui/type';

describe('resolveSidebarTypePack styles', () => {
  it('resolves compact and default modules', () => {
    expect(TYPE_PACK_REGISTRY.compact.styles.root).toBeTruthy();
    expect(TYPE_PACK_REGISTRY.default.styles.root).toBeTruthy();
    expect(resolveSidebarTypePack('compact').styles.root).toBe(
      TYPE_PACK_REGISTRY.compact.styles.root,
    );
    expect(resolveSidebarTypePack('default').styles.root).toBe(
      TYPE_PACK_REGISTRY.default.styles.root,
    );
  });

  it('falls back to default for unknown type', () => {
    expect(resolveSidebarTypePack('unknown-skin').styles.root).toBe(
      resolveSidebarTypePack('default').styles.root,
    );
  });
});
