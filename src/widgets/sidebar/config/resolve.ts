import type { SidebarConfig, SidebarRegionsConfig, SidebarScrollAreaConfig } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  ASIDE_SCROLL_AREA_OVERSCROLL,
  ASIDE_SCROLL_AREA_TYPES,
  type AsideRegionsSettings,
  type AsideScrollAreaOverscrollBehavior,
  type AsideScrollAreaSettings,
  type AsideSettings,
  getSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
} from '@/shared/config';
import { pickUnionValue, readSettingsKey, readString } from '@/shared/lib/coercion';
import { parseMenuItemDto } from '@/shared/lib/menu';
import { resolveTooltipConfig } from '@/shared/lib/tooltip';

import { resolveSidebarWidth } from '../lib';
import { resolveSidebarTypeTunableDefaults } from '../typePacks/tunableDefaults';
import { DEFAULT_SIDEBAR_CONFIG } from './defaults';

function parseCustomBlockItems(items: HeaderCustomBlockInput[]): MenuItemDto[] {
  const parsed: MenuItemDto[] = [];

  for (const entry of items) {
    const item = parseMenuItemDto(entry);
    if (item !== null) parsed.push(item);
  }

  return parsed;
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

function resolveCustomBlockList(
  sources: HeaderCustomBlockSettings[] | undefined,
): HeaderCustomBlockConfig[] {
  if (!sources || sources.length === 0) return [];

  return sources
    .map((raw) => resolveOneCustomBlock(raw))
    .filter((block): block is HeaderCustomBlockConfig => block !== null);
}

/** Global `aside.customBlocks` then `aside.types[type].customBlocks`. */
function resolveCustomBlocks(aside: AsideSettings, type: string): SidebarConfig['customBlocks'] {
  const globalBlocks = resolveCustomBlockList(aside.customBlocks);
  const typeBlocks = resolveCustomBlockList(aside.types?.[type]?.customBlocks);
  const merged = [...globalBlocks, ...typeBlocks];
  return merged.length > 0 ? merged : undefined;
}

function resolveRegions(
  pack: SidebarRegionsConfig,
  raw: AsideRegionsSettings | undefined,
): SidebarRegionsConfig {
  return {
    header: raw?.header ?? pack.header,
    main: raw?.main ?? pack.main,
    footer: raw?.footer ?? pack.footer,
  };
}

function resolveFiniteNumber(raw: unknown, fallback: number): number {
  return Number.isFinite(raw) ? (raw as number) : fallback;
}

function resolveOpenedDropdowns(aside: AsideSettings): readonly string[] {
  const raw = aside.openedDropdowns;
  if (!raw || !Array.isArray(raw)) {
    return DEFAULT_SIDEBAR_CONFIG.openedDropdowns;
  }

  return raw.filter((key): key is string => typeof key === 'string' && key.trim().length > 0);
}

function resolveScrollArea(
  raw: AsideScrollAreaSettings | undefined,
  defaults: SidebarScrollAreaConfig,
): SidebarScrollAreaConfig {
  const scrollbarSize = resolveFiniteNumber(raw?.scrollbarSize, defaults.scrollbarSize);
  const scrollHideDelay = resolveFiniteNumber(raw?.scrollHideDelay, defaults.scrollHideDelay);

  return {
    ...defaults,
    ...raw,
    scrollbarSize: Math.max(1, Math.round(scrollbarSize)),
    scrollHideDelay: Math.max(0, Math.round(scrollHideDelay)),
    type: pickUnionValue(ASIDE_SCROLL_AREA_TYPES, raw?.type, defaults.type),
    overscrollBehavior: pickUnionValue(
      ASIDE_SCROLL_AREA_OVERSCROLL,
      raw?.overscrollBehavior,
      defaults.overscrollBehavior,
    ) as AsideScrollAreaOverscrollBehavior,
  };
}

export function resolveSidebarConfig(
  settings = getSettings(),
  overrides?: Partial<AsideSettings>,
): SidebarConfig {
  const aside = { ...settings.aside, ...overrides };
  const width = resolveSidebarWidth(aside.width);
  const type = readSettingsKey(aside.type, DEFAULT_SIDEBAR_CONFIG.type);
  const packDefaults = resolveSidebarTypeTunableDefaults(type);
  const typeTunables = aside.types?.[type];

  return {
    ...(width && { width }),
    layout: readSettingsKey(aside.layout, DEFAULT_SIDEBAR_CONFIG.layout),
    type,
    openedDropdowns: resolveOpenedDropdowns(aside),
    customBlocks: resolveCustomBlocks(aside, type),
    regions: resolveRegions(packDefaults.regions, typeTunables?.regions),
    scrollArea: resolveScrollArea(aside.scrollArea, packDefaults.scrollArea),
    tooltip: resolveTooltipConfig(packDefaults.tooltip, aside.tooltip),
  };
}
