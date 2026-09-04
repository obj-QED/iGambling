import type { SidebarRegionsConfig, SidebarSchema, SidebarScrollAreaConfig } from '../types';
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
  resolveCmfActiveConfig,
} from '@/shared/config';
import { pickUnionValue, readSettingsKey, readString } from '@/shared/lib/coercion';
import { parseMenuItemDto } from '@/shared/lib/menu';
import { resolveTooltipConfig } from '@/shared/lib/tooltip';
import {
  resolveWidgetSchema,
  type SchemaLayers,
  type SchemaVersion,
  WRAPPER_MODES,
  type WrapperMode,
} from '@/shared/schema';

import { resolveSidebarWidth } from '../lib';
import { resolveSidebarTypeTunableDefaults } from '../ui/type/tunableDefaults';
import { DEFAULT_SIDEBAR_CONFIG } from './defaults';

/** Settings-shaped layer; version stays open until coerce. */
export type SidebarSchemaLayer = Omit<Partial<AsideSettings>, 'version'> &
  Partial<Omit<SidebarSchema, 'version'>> & {
    version?: SchemaVersion | number | string;
  };

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
function resolveCustomBlocks(
  aside: SidebarSchemaLayer,
  type: string,
): SidebarSchema['customBlocks'] {
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

function resolveOpenedDropdowns(aside: SidebarSchemaLayer): readonly string[] {
  const raw = aside.openedDropdowns;
  if (!raw || !Array.isArray(raw)) {
    return DEFAULT_SIDEBAR_CONFIG.openedDropdowns;
  }

  return raw.filter((key): key is string => typeof key === 'string' && key.trim().length > 0);
}

function resolveSpecialBlockKeys(aside: SidebarSchemaLayer): readonly string[] {
  const raw = aside.specialBlockKeys;
  if (!raw || !Array.isArray(raw)) {
    return DEFAULT_SIDEBAR_CONFIG.specialBlockKeys;
  }

  const keys = raw.filter((key): key is string => typeof key === 'string' && key.trim().length > 0);
  return keys.length > 0 ? keys : DEFAULT_SIDEBAR_CONFIG.specialBlockKeys;
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

function resolveWrappers(
  raw: SidebarSchemaLayer['wrappers'] | undefined,
): SidebarSchema['wrappers'] {
  if (!raw) return { ...DEFAULT_SIDEBAR_CONFIG.wrappers };
  const resolved: SidebarSchema['wrappers'] = {};
  for (const [key, value] of Object.entries(raw)) {
    resolved[key] = pickUnionValue(
      WRAPPER_MODES,
      typeof value === 'string' ? (value as WrapperMode) : undefined,
      'none',
    );
  }
  return resolved;
}

function resolveBehavior(
  raw: SidebarSchemaLayer['behavior'] | undefined,
): SidebarSchema['behavior'] {
  return {
    sticky: raw?.sticky ?? DEFAULT_SIDEBAR_CONFIG.behavior.sticky,
    transparent: raw?.transparent ?? DEFAULT_SIDEBAR_CONFIG.behavior.transparent,
    hideOnScroll: raw?.hideOnScroll ?? DEFAULT_SIDEBAR_CONFIG.behavior.hideOnScroll,
  };
}

function mergeBlockVariants(
  base: SidebarSchema['blockVariants'],
  overlay: SidebarSchemaLayer['blockVariants'] | undefined,
): SidebarSchema['blockVariants'] {
  if (overlay === undefined) return { ...base };
  return { ...base, ...overlay };
}

function adapterForType(type: string): string {
  if (type === 'compact') {
    return 'icon';
  }
  return 'row';
}

function typePackBlockVariants(
  aside: SidebarSchemaLayer,
  type: string,
): SidebarSchemaLayer['blockVariants'] | undefined {
  const types = aside.types;
  if (types === undefined) {
    return undefined;
  }
  const pack = types[type];
  if (pack === undefined) {
    return undefined;
  }
  return pack.blockVariants;
}

function mergeBlockVariantLayers(
  base: SidebarSchema['blockVariants'],
  overlays: ReadonlyArray<SidebarSchemaLayer['blockVariants'] | undefined>,
): SidebarSchema['blockVariants'] {
  if (overlays.length === 0) {
    return { ...base };
  }
  const [head, ...tail] = overlays;
  if (head === undefined) {
    return mergeBlockVariantLayers(base, tail);
  }
  return mergeBlockVariantLayers(mergeBlockVariants(base, head), tail);
}

function layerBlockVariants(
  layer: SidebarSchemaLayer | undefined,
): SidebarSchemaLayer['blockVariants'] | undefined {
  if (layer === undefined) {
    return undefined;
  }
  return layer.blockVariants;
}

/**
 * Derive adapter variants from type when unset: compact → icon, else row.
 * Cascade: pack/type derive → legacy `aside.blockVariants` → `aside.types[type].blockVariants`.
 */
function resolveBlockVariants(
  aside: SidebarSchemaLayer,
  type: string,
  layers: SchemaLayers<SidebarSchemaLayer>,
): SidebarSchema['blockVariants'] {
  const adapter = adapterForType(type);
  return mergeBlockVariantLayers(
    {
      search: adapter,
      promo: adapter,
    },
    [
      layerBlockVariants(layers.global),
      layerBlockVariants(layers.brand),
      layerBlockVariants(layers.page),
      layerBlockVariants(layers.props),
      typePackBlockVariants(aside, type),
    ],
  );
}

function coerceSidebarSchema(
  merged: SidebarSchema & SidebarSchemaLayer,
  settingsOverlay: {
    tooltip?: SidebarSchemaLayer['tooltip'];
    scrollArea?: SidebarSchemaLayer['scrollArea'];
  },
  layers: SchemaLayers<SidebarSchemaLayer>,
): SidebarSchema {
  const width = resolveSidebarWidth(merged.width);
  const type = readSettingsKey(merged.type, DEFAULT_SIDEBAR_CONFIG.type);
  const packDefaults = resolveSidebarTypeTunableDefaults(type);
  const typeTunables = merged.types?.[type];

  return {
    version: merged.version === 2 ? 2 : 1,
    ...(width && { width }),
    layout: readSettingsKey(merged.layout, DEFAULT_SIDEBAR_CONFIG.layout),
    type,
    blockVariants: resolveBlockVariants(merged, type, layers),
    openedDropdowns: resolveOpenedDropdowns(merged),
    specialBlockKeys: resolveSpecialBlockKeys(merged),
    customBlocks: resolveCustomBlocks(merged, type),
    regions: resolveRegions(packDefaults.regions, typeTunables?.regions),
    scrollArea: resolveScrollArea(settingsOverlay.scrollArea, packDefaults.scrollArea),
    tooltip: resolveTooltipConfig(packDefaults.tooltip, settingsOverlay.tooltip),
    active: resolveCmfActiveConfig(merged.active, DEFAULT_SIDEBAR_CONFIG.active),
    wrappers: resolveWrappers(merged.wrappers),
    behavior: resolveBehavior(merged.behavior),
    capabilities: {
      ...DEFAULT_SIDEBAR_CONFIG.capabilities,
      ...merged.capabilities,
    },
  };
}

function pickLayerField<T>(
  layers: SchemaLayers<SidebarSchemaLayer>,
  key: 'tooltip' | 'scrollArea',
): T | undefined {
  return (
    (layers.props?.[key] as T | undefined) ??
    (layers.page?.[key] as T | undefined) ??
    (layers.brand?.[key] as T | undefined) ??
    (layers.global?.[key] as T | undefined)
  );
}

export function resolveSidebarSchema(layers: SchemaLayers<SidebarSchema> = {}): SidebarSchema {
  const settingsOverlay = {
    tooltip: pickLayerField<SidebarSchemaLayer['tooltip']>(
      layers as SchemaLayers<SidebarSchemaLayer>,
      'tooltip',
    ),
    scrollArea: pickLayerField<SidebarSchemaLayer['scrollArea']>(
      layers as SchemaLayers<SidebarSchemaLayer>,
      'scrollArea',
    ),
  };

  return resolveWidgetSchema(DEFAULT_SIDEBAR_CONFIG, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) =>
      coerceSidebarSchema(
        merged as SidebarSchema & SidebarSchemaLayer,
        settingsOverlay,
        layers as SchemaLayers<SidebarSchemaLayer>,
      ),
  });
}

/**
 * @deprecated Prefer `resolveSidebarSchema({ global: settings.aside, props: overrides })`.
 */
export function resolveSidebarConfig(
  settings = getSettings(),
  overrides?: Partial<AsideSettings>,
): SidebarSchema {
  return resolveSidebarSchema({
    global: settings.aside as Partial<SidebarSchema> | undefined,
    props: overrides as Partial<SidebarSchema> | undefined,
  });
}
