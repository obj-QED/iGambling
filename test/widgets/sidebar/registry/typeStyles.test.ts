import { describe, expect, it } from 'vitest';

import { resolveSidebarTypeStyles } from '@/widgets/sidebar/registry/typeStyles';
import { resolveSidebarTypePack, TYPE_PACK_REGISTRY } from '@/widgets/sidebar/typePacks';

describe('resolveSidebarTypeStyles', () => {
  it('resolves compact and default modules', () => {
    expect(TYPE_PACK_REGISTRY.compact.styles.root).toBeTruthy();
    expect(TYPE_PACK_REGISTRY.default.styles.root).toBeTruthy();
    expect(resolveSidebarTypeStyles('compact').root).toBe(TYPE_PACK_REGISTRY.compact.styles.root);
    expect(resolveSidebarTypeStyles('default').root).toBe(TYPE_PACK_REGISTRY.default.styles.root);
  });

  it('falls back to default for unknown type', () => {
    expect(resolveSidebarTypeStyles('unknown-skin').root).toBe(
      resolveSidebarTypePack('default').styles.root,
    );
  });
});
