import type { HeaderBlockVariants } from '../types';
import type { HeaderTypeStrategyKey } from '@/shared/config';

export type HeaderTypeTunables = {
  blockVariants: HeaderBlockVariants;
};

export const HEADER_TYPE_TUNABLE_DEFAULTS: Record<HeaderTypeStrategyKey, HeaderTypeTunables> = {
  default: { blockVariants: {} },
  custom: { blockVariants: {} },
  dropdown: { blockVariants: {} },
};

export function resolveHeaderTypeTunableDefaults(type: string): HeaderTypeTunables {
  if (Object.hasOwn(HEADER_TYPE_TUNABLE_DEFAULTS, type)) {
    return HEADER_TYPE_TUNABLE_DEFAULTS[type as HeaderTypeStrategyKey];
  }
  return HEADER_TYPE_TUNABLE_DEFAULTS.default;
}
