import type { BlockProps } from '../types';
import type { ComponentType } from 'react';

const DEFAULT_SPECIAL_BLOCK_VARIANT = 'compact';

/**
 * Pick a registered block adapter by settings `blockVariants.*` string.
 * Unknown / missing → `compact` when registered, else first registry entry.
 */
export function resolveBlockVariantComponent<
  TRegistry extends Record<string, ComponentType<BlockProps>>,
>(
  registry: TRegistry,
  variant: string | undefined,
  fallbackKey: keyof TRegistry & string = DEFAULT_SPECIAL_BLOCK_VARIANT,
): ComponentType<BlockProps> {
  const key = variant?.trim() ?? '';
  if (key.length > 0 && Object.hasOwn(registry, key)) {
    return registry[key];
  }
  if (Object.hasOwn(registry, fallbackKey)) {
    return registry[fallbackKey];
  }
  const first = Object.values(registry)[0];
  if (first === undefined) {
    throw new Error('Block variant registry is empty');
  }
  return first;
}
