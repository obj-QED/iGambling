import type { HeaderConfig } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  getSettings,
  type HeaderBlockVariantSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
  type HeaderSettings,
} from '@/shared/config';
import { readSettingsKey, readString } from '@/shared/lib/coercion';
import { parseMenuItemDto } from '@/shared/lib/menu';

import { resolveHeaderTypeTunableDefaults } from '../typePacks/tunableDefaults';
import { DEFAULT_HEADER_CONFIG } from './defaults';

function parseCustomBlockItems(items: HeaderCustomBlockInput[]): MenuItemDto[] {
  const parsed: MenuItemDto[] = [];

  for (const entry of items) {
    const item = parseMenuItemDto(entry);
    if (item !== null) parsed.push(item);
  }

  return parsed;
}

function readCustomBlockSources(header: HeaderSettings): HeaderCustomBlockSettings[] {
  if (header.customBlocks !== undefined && header.customBlocks.length > 0) {
    return header.customBlocks;
  }

  if (header.customBlock !== undefined) {
    return [header.customBlock];
  }

  return [];
}

function resolveOneCustomBlock(raw: HeaderCustomBlockSettings): HeaderCustomBlockConfig | null {
  const key = readString(raw.key).trim();
  if (key.length === 0) return null;

  const items = parseCustomBlockItems(raw.items);
  if (items.length === 0) return null;

  return {
    key,
    placement: raw.placement,
    items,
  };
}

function resolveCustomBlocks(header: HeaderSettings): HeaderConfig['customBlocks'] {
  const resolved = readCustomBlockSources(header)
    .map((raw) => resolveOneCustomBlock(raw))
    .filter((block): block is HeaderCustomBlockConfig => block !== null);

  return resolved.length > 0 ? resolved : undefined;
}

function mergeBlockVariants(
  base: HeaderConfig['blockVariants'],
  layer: HeaderBlockVariantSettings | undefined,
): HeaderConfig['blockVariants'] {
  if (!layer) return base;
  return { ...base, ...layer };
}

/**
 * pack defaults → legacy `header.blockVariants` → `header.types[type].blockVariants` (nested wins).
 */
function resolveActiveBlockVariants(
  header: HeaderSettings,
  type: string,
  packVariants: HeaderConfig['blockVariants'],
): HeaderConfig['blockVariants'] {
  const withLegacy = mergeBlockVariants(packVariants, header.blockVariants);
  return mergeBlockVariants(withLegacy, header.types?.[type]?.blockVariants);
}

export function resolveHeaderConfig(
  settings = getSettings(),
  overrides?: Partial<HeaderSettings>,
): HeaderConfig {
  const header = { ...settings.header, ...overrides };
  const type = readSettingsKey(header.type, DEFAULT_HEADER_CONFIG.type);
  const packDefaults = resolveHeaderTypeTunableDefaults(type);

  return {
    layout: readSettingsKey(header.layout, DEFAULT_HEADER_CONFIG.layout),
    type,
    blockVariants: resolveActiveBlockVariants(header, type, packDefaults.blockVariants),
    customBlocks: resolveCustomBlocks(header),
  };
}
