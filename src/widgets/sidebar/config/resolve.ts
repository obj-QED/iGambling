import type { SidebarRegionsConfig, SidebarSchema, SidebarScrollAreaConfig } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  ASIDE_CONTROL_FITS,
  ASIDE_SCROLL_AREA_OVERSCROLL,
  ASIDE_SCROLL_AREA_TYPES,
  type AsideRegionsSettings,
  type AsideScrollAreaOverscrollBehavior,
  type AsideScrollAreaSettings,
  type AsideSettings,
  type DrawerSettings,
  flattenBlockVariantSettings,
  getSearchDefaultSpec,
  getSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
  mapAsideSearchStyle,
  resolveCmfActiveConfig,
  type SearchSettings,
} from '@/shared/config';
import { isRecord, pickUnionValue, readSettingsKey, readString } from '@/shared/lib/coercion';
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

const DRAWER_RUNTIME_STRIP = new Set(['opened', 'onClose', 'children']);

/** Passthrough Mantine Drawer props from `aside.drawer` (strip runtime-owned keys). */
function resolveDrawer(raw: unknown): DrawerSettings | undefined {
  if (!isRecord(raw)) return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (DRAWER_RUNTIME_STRIP.has(key)) continue;
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? (out as DrawerSettings) : undefined;
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
  overlay: SidebarSchema['blockVariants'] | undefined,
): SidebarSchema['blockVariants'] {
  if (overlay === undefined) return { ...base };
  return { ...base, ...overlay };
}

function adapterForType(type: string): string {
  if (type === 'compact' || type === 'slideout') {
    return 'icon';
  }
  return 'row';
}

function typePackBlockVariants(
  aside: SidebarSchemaLayer,
  type: string,
): AsideSettings['blockVariants'] | undefined {
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
  overlays: ReadonlyArray<SidebarSchema['blockVariants'] | undefined>,
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
): AsideSettings['blockVariants'] | undefined {
  if (layer === undefined) {
    return undefined;
  }
  return layer.blockVariants;
}

function mapAsideBlockStyle(domain: string, style: string | undefined): string | undefined {
  if (domain === 'search') return mapAsideSearchStyle(style);
  return style;
}

function flattenAsideLayerVariants(
  overlay: AsideSettings['blockVariants'] | undefined,
  wrappers: SidebarSchema['wrappers'],
  behaviors: SidebarSchema['behaviors'],
  searchDefaults?: SearchSettings,
): {
  variants: SidebarSchema['blockVariants'];
  wrappers: SidebarSchema['wrappers'];
  behaviors: SidebarSchema['behaviors'];
} {
  const flat = flattenBlockVariantSettings(overlay, wrappers, {
    aliases: { search_leftmenu: 'search' },
    baseBehaviors: behaviors,
    domainDefaults: searchDefaults
      ? { search: { type: searchDefaults.type, style: searchDefaults.style } }
      : undefined,
    mapStyle: mapAsideBlockStyle,
  });
  return {
    variants: flat.variants as SidebarSchema['blockVariants'],
    wrappers: flat.wrappers as SidebarSchema['wrappers'],
    behaviors: flat.behaviors,
  };
}

/**
 * Derive adapter variants from type when unset: compact → icon, else row.
 * Cascade: pack/type derive → flattened `aside.blockVariants` (+ `params.search`) →
 * `aside.types[type].blockVariants`. `search_leftmenu` aliases to `search`.
 */
function resolveBlockVariantsAndWrappers(
  aside: SidebarSchemaLayer,
  type: string,
  layers: SchemaLayers<SidebarSchemaLayer>,
  baseWrappers: SidebarSchema['wrappers'],
  searchDefaults?: SearchSettings,
): {
  blockVariants: SidebarSchema['blockVariants'];
  wrappers: SidebarSchema['wrappers'];
  behaviors: SidebarSchema['behaviors'];
} {
  const adapter = adapterForType(type);
  let wrappers = { ...baseWrappers };
  let behaviors: SidebarSchema['behaviors'] = {};

  const flattenedLayers: SidebarSchema['blockVariants'][] = [];
  for (const overlay of [
    layerBlockVariants(layers.global),
    layerBlockVariants(layers.brand),
    layerBlockVariants(layers.page),
    layerBlockVariants(layers.props),
    typePackBlockVariants(aside, type),
  ]) {
    const flat = flattenAsideLayerVariants(overlay, wrappers, behaviors, searchDefaults);
    wrappers = flat.wrappers;
    behaviors = flat.behaviors;
    flattenedLayers.push(flat.variants);
  }

  return {
    blockVariants: {
      ...mergeBlockVariantLayers(
        {
          search: adapter,
          promo: adapter,
        },
        flattenedLayers,
      ),
      // Compact / slideout rail cannot host row TextInput — chrome stays icon.
      // Behavior (`type`: modal|spotlight|input) still comes from settings.
      ...(adapter === 'icon' ? { search: 'icon', promo: 'icon' } : {}),
    },
    wrappers,
    behaviors,
  };
}

function coerceSidebarSchema(
  merged: SidebarSchema & SidebarSchemaLayer,
  settingsOverlay: {
    tooltip?: SidebarSchemaLayer['tooltip'];
    scrollArea?: SidebarSchemaLayer['scrollArea'];
    drawer?: SidebarSchemaLayer['drawer'];
  },
  layers: SchemaLayers<SidebarSchemaLayer>,
  searchDefaults?: SearchSettings,
): SidebarSchema {
  const width = resolveSidebarWidth(merged.width);
  const type = readSettingsKey(merged.type, DEFAULT_SIDEBAR_CONFIG.type);
  const packDefaults = resolveSidebarTypeTunableDefaults(type);
  const typeTunables = merged.types?.[type];
  const drawer = resolveDrawer(settingsOverlay.drawer ?? merged.drawer);
  const { blockVariants, wrappers, behaviors } = resolveBlockVariantsAndWrappers(
    merged,
    type,
    layers,
    resolveWrappers(merged.wrappers),
    searchDefaults,
  );

  return {
    version: merged.version === 2 ? 2 : 1,
    ...(width && { width }),
    layout: readSettingsKey(merged.layout, DEFAULT_SIDEBAR_CONFIG.layout),
    type,
    controlFit: pickUnionValue(
      ASIDE_CONTROL_FITS,
      merged.controlFit,
      DEFAULT_SIDEBAR_CONFIG.controlFit,
    ),
    blockVariants,
    openedDropdowns: resolveOpenedDropdowns(merged),
    specialBlockKeys: resolveSpecialBlockKeys(merged),
    customBlocks: resolveCustomBlocks(merged, type),
    regions: resolveRegions(packDefaults.regions, typeTunables?.regions),
    scrollArea: resolveScrollArea(settingsOverlay.scrollArea, packDefaults.scrollArea),
    tooltip: resolveTooltipConfig(packDefaults.tooltip, settingsOverlay.tooltip),
    ...(drawer ? { drawer } : {}),
    active: resolveCmfActiveConfig(merged.active, DEFAULT_SIDEBAR_CONFIG.active),
    wrappers,
    behaviors,
    behavior: resolveBehavior(merged.behavior),
    capabilities: {
      ...DEFAULT_SIDEBAR_CONFIG.capabilities,
      ...merged.capabilities,
    },
  };
}

function pickLayerField<T>(
  layers: SchemaLayers<SidebarSchemaLayer>,
  key: 'tooltip' | 'scrollArea' | 'drawer',
): T | undefined {
  return (
    (layers.props?.[key] as T | undefined) ??
    (layers.page?.[key] as T | undefined) ??
    (layers.brand?.[key] as T | undefined) ??
    (layers.global?.[key] as T | undefined)
  );
}

export function resolveSidebarSchema(
  layers: SchemaLayers<SidebarSchema> = {},
  searchDefaults?: SearchSettings,
): SidebarSchema {
  const settingsOverlay = {
    tooltip: pickLayerField<SidebarSchemaLayer['tooltip']>(
      layers as SchemaLayers<SidebarSchemaLayer>,
      'tooltip',
    ),
    scrollArea: pickLayerField<SidebarSchemaLayer['scrollArea']>(
      layers as SchemaLayers<SidebarSchemaLayer>,
      'scrollArea',
    ),
    drawer: pickLayerField<SidebarSchemaLayer['drawer']>(
      layers as SchemaLayers<SidebarSchemaLayer>,
      'drawer',
    ),
  };

  return resolveWidgetSchema(DEFAULT_SIDEBAR_CONFIG, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) =>
      coerceSidebarSchema(
        merged as SidebarSchema & SidebarSchemaLayer,
        settingsOverlay,
        layers as SchemaLayers<SidebarSchemaLayer>,
        searchDefaults,
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
  return resolveSidebarSchema(
    {
      global: settings.aside as Partial<SidebarSchema> | undefined,
      props: overrides as Partial<SidebarSchema> | undefined,
    },
    getSearchDefaultSpec(settings),
  );
}
