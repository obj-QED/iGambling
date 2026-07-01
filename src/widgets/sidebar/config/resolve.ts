import type { SidebarConfig } from '../types';
import type { PageMenuItemDto } from '@/shared/types/pageMenu';

import {
  ASIDE_TYPE_KEYS,
  type AsideSettings,
  getSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
} from '@/shared/config';
import { pickUnionValue, readString } from '@/shared/lib/coercion';
import { parsePageMenuItemDto } from '@/shared/lib/pageMenu';

import { DEFAULT_SIDEBAR_CONFIG } from './defaults';

function parseCustomBlockItems(items: HeaderCustomBlockInput[]): PageMenuItemDto[] {
  const parsed: PageMenuItemDto[] = [];

  for (const entry of items) {
    const item = parsePageMenuItemDto(entry);
    if (item !== null) parsed.push(item);
  }

  return parsed;
}

function readCustomBlockSources(aside: AsideSettings): HeaderCustomBlockSettings[] {
  if (aside.customBlocks !== undefined && aside.customBlocks.length > 0) {
    return aside.customBlocks;
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

function resolveCustomBlocks(aside: AsideSettings): SidebarConfig['customBlocks'] {
  const resolved = readCustomBlockSources(aside)
    .map((raw) => resolveOneCustomBlock(raw))
    .filter((block): block is HeaderCustomBlockConfig => block !== null);

  return resolved.length > 0 ? resolved : undefined;
}

function resolveWidth(raw: unknown): number {
  const value =
    typeof raw === 'number' && Number.isFinite(raw) ? raw : DEFAULT_SIDEBAR_CONFIG.width;
  return Math.max(0, Math.round(value));
}

export function resolveSidebarConfig(
  settings = getSettings(),
  overrides?: Partial<AsideSettings>,
): SidebarConfig {
  const aside = { ...settings.aside, ...overrides };

  return {
    width: resolveWidth(aside.width),
    type: pickUnionValue(ASIDE_TYPE_KEYS, aside.type, DEFAULT_SIDEBAR_CONFIG.type),
    customBlocks: resolveCustomBlocks(aside),
  };
}
