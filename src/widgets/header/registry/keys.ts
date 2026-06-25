import { HEADER_SPECIAL_BLOCK_KEYS, type HeaderSpecialBlockKey } from '../types/items.types';

export const BLOCK_ROUTING_KEYS = ['default', 'menuDropdown'] as const;

export type BlockRoutingKey = (typeof BLOCK_ROUTING_KEYS)[number];

export type BlockRegistryKey = BlockRoutingKey | HeaderSpecialBlockKey;

const REGISTRY_KEY_SET = new Set<string>([...BLOCK_ROUTING_KEYS, ...HEADER_SPECIAL_BLOCK_KEYS]);

export function isBlockRegistryKey(key: string): key is BlockRegistryKey {
  return REGISTRY_KEY_SET.has(key);
}

export function resolveBlockRegistryKey(itemKey: string): BlockRegistryKey {
  if (isBlockRegistryKey(itemKey)) return itemKey;
  return 'default';
}
