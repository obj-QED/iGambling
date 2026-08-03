import type { BlockProps } from '../../../types';
import type { ComponentType } from 'react';

import { resolveBlockVariantComponent } from '../../../lib';
import { SearchIconVariant } from './variants/SearchIconVariant';
import { SearchInputVariant } from './variants/SearchInputVariant';
import { SearchModalVariant } from './variants/SearchModalVariant';

export const SEARCH_VARIANT_REGISTRY = {
  /** Default special adapter (ActionIcon). */
  compact: SearchIconVariant,
  input: SearchInputVariant,
  modal: SearchModalVariant,
} as const satisfies Record<string, ComponentType<BlockProps>>;

export type SearchBlockVariant = keyof typeof SEARCH_VARIANT_REGISTRY;

export function resolveSearchVariantComponent(
  variant: string | undefined,
): ComponentType<BlockProps> {
  return resolveBlockVariantComponent(SEARCH_VARIANT_REGISTRY, variant);
}
