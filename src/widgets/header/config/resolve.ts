import type { HeaderConfig } from '../types';
import type { PageMenuItemDto } from '@/shared/types/pageMenu';

import {
  getSettings,
  HEADER_LAYOUT_KEYS,
  HEADER_TYPE_KEYS,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
  type HeaderSettings,
} from '@/shared/config';
import { pickUnionValue, readString } from '@/shared/lib/coercion';
import { parsePageMenuItemDto } from '@/shared/lib/pageMenu';

import { DEFAULT_HEADER_CONFIG } from './defaults';

function parseCustomBlockItems(items: HeaderCustomBlockInput[]): PageMenuItemDto[] {
  const parsed: PageMenuItemDto[] = [];

  for (const entry of items) {
    const item = parsePageMenuItemDto(entry);
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

export function resolveHeaderConfig(
  settings = getSettings(),
  overrides?: Partial<HeaderSettings>,
): HeaderConfig {
  const header = { ...settings.header, ...overrides };

  return {
    layout: pickUnionValue(HEADER_LAYOUT_KEYS, header.layout, DEFAULT_HEADER_CONFIG.layout),
    type: pickUnionValue(HEADER_TYPE_KEYS, header.type, DEFAULT_HEADER_CONFIG.type),
    blockVariants: header.blockVariants ?? DEFAULT_HEADER_CONFIG.blockVariants,
    customBlocks: resolveCustomBlocks(header),
  };
}
