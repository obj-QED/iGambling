import type { SidebarConfig } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  ASIDE_SCROLL_AREA_OVERSCROLL,
  ASIDE_SCROLL_AREA_TYPES,
  ASIDE_TYPE_KEYS,
  type AsideSettings,
  getSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
} from '@/shared/config';
import { pickUnionValue, readString } from '@/shared/lib/coercion';
import { parseMenuItemDto } from '@/shared/lib/menu';

import { DEFAULT_SIDEBAR_CONFIG, DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG } from './defaults';

function parseCustomBlockItems(items: HeaderCustomBlockInput[]): MenuItemDto[] {
  const parsed: MenuItemDto[] = [];

  for (const entry of items) {
    const item = parseMenuItemDto(entry);
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

function resolveFiniteNumber(raw: unknown, fallback: number): number {
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : fallback;
}

function resolveOpenedDropdowns(aside: AsideSettings): readonly string[] {
  const raw = aside.openedDropdowns;
  if (raw === undefined || Array.isArray(raw) === false) {
    return DEFAULT_SIDEBAR_CONFIG.openedDropdowns;
  }

  return raw.filter((key): key is string => typeof key === 'string' && key.trim().length > 0);
}

function resolveScrollArea(aside: AsideSettings): SidebarConfig['scrollArea'] {
  const raw = aside.scrollArea;
  const defaults = DEFAULT_SIDEBAR_SCROLL_AREA_CONFIG;

  const scrollbarSize = resolveFiniteNumber(raw?.scrollbarSize, defaults.scrollbarSize);
  const scrollHideDelay = resolveFiniteNumber(raw?.scrollHideDelay, defaults.scrollHideDelay);

  return {
    scrollbarSize: Math.max(1, Math.round(scrollbarSize)),
    scrollHideDelay: Math.max(0, Math.round(scrollHideDelay)),
    type: pickUnionValue(ASIDE_SCROLL_AREA_TYPES, raw?.type, defaults.type),
    overscrollBehavior: pickUnionValue(
      ASIDE_SCROLL_AREA_OVERSCROLL,
      raw?.overscrollBehavior,
      defaults.overscrollBehavior,
    ),
  };
}

export function resolveSidebarConfig(
  settings = getSettings(),
  overrides?: Partial<AsideSettings>,
): SidebarConfig {
  const aside = { ...settings.aside, ...overrides };

  return {
    width: resolveWidth(aside.width),
    type: pickUnionValue(ASIDE_TYPE_KEYS, aside.type, DEFAULT_SIDEBAR_CONFIG.type),
    openedDropdowns: resolveOpenedDropdowns(aside),
    customBlocks: resolveCustomBlocks(aside),
    scrollArea: resolveScrollArea(aside),
  };
}
