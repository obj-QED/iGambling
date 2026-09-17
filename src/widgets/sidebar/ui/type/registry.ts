import type { SidebarTypePack } from './types';
import type { AsideTypeStrategyKey } from '@/shared/config';

import { compactTypePack } from './compact';
import { defaultTypePack } from './default';
import { slideinTypePack } from './slidein';
import { slideoutTypePack } from './slideout';

export const TYPE_PACK_REGISTRY: Record<AsideTypeStrategyKey, SidebarTypePack> = {
  default: defaultTypePack,
  compact: compactTypePack,
  slideout: slideoutTypePack,
  slidein: slideinTypePack,
};

/** Unknown type string → `default` pack. */
export function resolveSidebarTypePack(type: string): SidebarTypePack {
  if (Object.hasOwn(TYPE_PACK_REGISTRY, type)) {
    return TYPE_PACK_REGISTRY[type as AsideTypeStrategyKey];
  }
  return TYPE_PACK_REGISTRY.default;
}
