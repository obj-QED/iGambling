import type { RootProps } from '../types';
import type { HeaderTypeStrategyKey } from '@/shared/config';
import type { ComponentType } from 'react';

import { resolveHeaderTypePack } from '../typePacks/registry';

/** @deprecated Prefer `resolveHeaderTypePack(type).Strategy`. */
export function resolveHeaderTypeStrategy(type: string): ComponentType<RootProps> {
  return resolveHeaderTypePack(type).Strategy;
}

/** @deprecated Prefer `TYPE_PACK_REGISTRY` from `typePacks`. */
export const TYPE_STRATEGY_REGISTRY = {
  get default() {
    return resolveHeaderTypePack('default').Strategy;
  },
  get custom() {
    return resolveHeaderTypePack('custom').Strategy;
  },
  get dropdown() {
    return resolveHeaderTypePack('dropdown').Strategy;
  },
} as Record<HeaderTypeStrategyKey, ComponentType<RootProps>>;
