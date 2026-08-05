import type { AsideTypeStrategyKey } from '@/shared/config';

import { resolveSidebarTypePack, type SidebarTypeStyles } from '../ui/type';

/** @deprecated Prefer `resolveSidebarTypePack(type).styles`. */
export function resolveSidebarTypeStyles(type: string): SidebarTypeStyles {
  return resolveSidebarTypePack(type).styles;
}

/** @deprecated Prefer `TYPE_PACK_REGISTRY` from `ui/type`. */
export const TYPE_STYLE_REGISTRY = {
  get default() {
    return resolveSidebarTypePack('default').styles;
  },
  get compact() {
    return resolveSidebarTypePack('compact').styles;
  },
} as Record<AsideTypeStrategyKey, SidebarTypeStyles>;
