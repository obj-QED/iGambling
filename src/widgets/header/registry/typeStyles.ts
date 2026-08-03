import type { HeaderTypeStrategyKey } from '@/shared/config';

import { type HeaderTypeStyles, resolveHeaderTypePack } from '../typePacks';

/** @deprecated Prefer `resolveHeaderTypePack(type).styles`. */
export function resolveHeaderTypeStyles(type: string): HeaderTypeStyles {
  return resolveHeaderTypePack(type).styles;
}

/** @deprecated Prefer `TYPE_PACK_REGISTRY` from `typePacks`. */
export const TYPE_STYLE_REGISTRY = {
  get default() {
    return resolveHeaderTypePack('default').styles;
  },
  get custom() {
    return resolveHeaderTypePack('custom').styles;
  },
  get dropdown() {
    return resolveHeaderTypePack('dropdown').styles;
  },
} as Record<HeaderTypeStrategyKey, HeaderTypeStyles>;
