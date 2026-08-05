import type { HeaderTypePack } from './types';
import type { HeaderTypeStrategyKey } from '@/shared/config';

import { bindHeaderTypePackBlocksResolver } from '../../registry/blocks';
import { customTypePack } from './custom';
import { defaultTypePack } from './default';
import { dropdownTypePack } from './dropdown';

export const TYPE_PACK_REGISTRY: Record<HeaderTypeStrategyKey, HeaderTypePack> = {
  default: defaultTypePack,
  custom: customTypePack,
  dropdown: dropdownTypePack,
};

export function resolveHeaderTypePack(type: string): HeaderTypePack {
  if (Object.hasOwn(TYPE_PACK_REGISTRY, type)) {
    return TYPE_PACK_REGISTRY[type as HeaderTypeStrategyKey];
  }
  return TYPE_PACK_REGISTRY.default;
}

bindHeaderTypePackBlocksResolver((type) => resolveHeaderTypePack(type).blocks);
