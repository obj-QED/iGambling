import type { SidebarTypeStrategyProps } from '../types';
import type { AsideTypeStrategyKey } from '@/shared/config';
import type { ComponentType } from 'react';

import { resolveSidebarTypePack } from '../typePacks/registry';

/** @deprecated Prefer `resolveSidebarTypePack(type).Strategy`. */
export function resolveSidebarTypeStrategy(type: string): ComponentType<SidebarTypeStrategyProps> {
  return resolveSidebarTypePack(type).Strategy;
}

/** @deprecated Prefer `TYPE_PACK_REGISTRY` from `typePacks`. */
export const TYPE_STRATEGY_REGISTRY = {
  get default() {
    return resolveSidebarTypePack('default').Strategy;
  },
  get compact() {
    return resolveSidebarTypePack('compact').Strategy;
  },
} as Record<AsideTypeStrategyKey, ComponentType<SidebarTypeStrategyProps>>;
