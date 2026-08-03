import { SIDEBAR_SPECIAL_BLOCK_KEYS } from '../config/sidebarSpecialBlockKeys';

export const BLOCK_ROUTING_KEYS = ['default', 'menuDropdown'] as const;

export type BlockRoutingKey = (typeof BLOCK_ROUTING_KEYS)[number];

export type SidebarBlockRegistryKey = BlockRoutingKey | (typeof SIDEBAR_SPECIAL_BLOCK_KEYS)[number];

const REGISTRY_KEY_SET = new Set<string>([...BLOCK_ROUTING_KEYS, ...SIDEBAR_SPECIAL_BLOCK_KEYS]);

export function isSidebarBlockRegistryKey(key: string): key is SidebarBlockRegistryKey {
  return REGISTRY_KEY_SET.has(key);
}

export function resolveBlockRegistryKey(itemKey: string): SidebarBlockRegistryKey {
  if (isSidebarBlockRegistryKey(itemKey)) return itemKey;
  return 'default';
}
