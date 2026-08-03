import type { AsideTypeStrategyKey } from '@/shared/config';

import { resolveSidebarTypePack, type SidebarTypeStyles } from '../typePacks';

/** @deprecated Prefer `resolveSidebarTypePack(type).styles`. */
export function resolveSidebarTypeStyles(type: string): SidebarTypeStyles {
  return resolveSidebarTypePack(type).styles;
}

/** @deprecated Prefer `TYPE_PACK_REGISTRY` from `typePacks`. */
export const TYPE_STYLE_REGISTRY = {
  get default() {
    return resolveSidebarTypePack('default').styles;
  },
  get compact() {
    return resolveSidebarTypePack('compact').styles;
  },
} as Record<AsideTypeStrategyKey, SidebarTypeStyles>;
