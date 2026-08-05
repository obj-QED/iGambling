import type { SidebarTypePack } from './types';
import type { AsideTypeStrategyKey } from '@/shared/config';

import { bindSidebarTypePackBlocksResolver } from '../../registry/blocks';
import { compactTypePack } from './compact';
import { defaultTypePack } from './default';

export const TYPE_PACK_REGISTRY: Record<AsideTypeStrategyKey, SidebarTypePack> = {
  default: defaultTypePack,
  compact: compactTypePack,
};

/** Unknown type string → `default` pack. */
export function resolveSidebarTypePack(type: string): SidebarTypePack {
  if (Object.hasOwn(TYPE_PACK_REGISTRY, type)) {
    return TYPE_PACK_REGISTRY[type as AsideTypeStrategyKey];
  }
  return TYPE_PACK_REGISTRY.default;
}

bindSidebarTypePackBlocksResolver((type) => resolveSidebarTypePack(type).blocks);
