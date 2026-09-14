import type { HeaderSchema } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  flattenBlockVariantSettings,
  getSearchDefaultSpec,
  getSettings,
  type HeaderBlockVariantSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
  type HeaderSettings,
  mapHeaderSearchStyle,
  mapHeaderWalletStyle,
  type MenuSettings,
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

import { resolveHeaderTypeTunableDefaults } from '../ui/type/tunableDefaults';
import { DEFAULT_HEADER_CONFIG } from './defaults';

/** Settings-shaped layer; version stays open until coerce. */
export type HeaderSchemaLayer = Omit<Partial<HeaderSettings>, 'version'> &
  Partial<Omit<HeaderSchema, 'version'>> & {
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

function readCustomBlockSources(header: HeaderSchemaLayer): HeaderCustomBlockSettings[] {
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

  const viewRaw = readString(raw.view).trim();
  const view = viewRaw === 'mobile' || viewRaw === 'desktop' ? viewRaw : undefined;

  return {
    key,
    placement: raw.placement,
    items,
    ...(view !== undefined ? { view } : {}),
  };
}

function resolveCustomBlocks(header: HeaderSchemaLayer): HeaderSchema['customBlocks'] {
  const resolved = readCustomBlockSources(header)
    .map((raw) => resolveOneCustomBlock(raw))
    .filter((block): block is HeaderCustomBlockConfig => block !== null);

  return resolved.length > 0 ? resolved : undefined;
}

function mergeBlockVariants(
  base: HeaderSchema['blockVariants'],
  layer: HeaderSchema['blockVariants'] | undefined,
): HeaderSchema['blockVariants'] {
  if (!layer) return { ...base };
  return { ...base, ...layer };
}

function resolveWrapperMode(raw: unknown, fallback: WrapperMode = 'none'): WrapperMode {
  return pickUnionValue(
    WRAPPER_MODES,
    typeof raw === 'string' ? (raw as WrapperMode) : undefined,
    fallback,
  );
}

function mapHeaderBlockStyle(domain: string, style: string | undefined): string | undefined {
  if (domain === 'search') return mapHeaderSearchStyle(style);
  if (domain === 'wallet') return mapHeaderWalletStyle(style);
  return style;
}

/**
 * Flatten `{ type, style }` / legacy strings → adapter keys + wrappers.
 * Cascade: `params.search` → layer `blockVariants`.
 */
function flattenHeaderBlockVariants(
  overlay: HeaderBlockVariantSettings | undefined,
  wrappers: HeaderSchema['wrappers'],
  behaviors: HeaderSchema['behaviors'],
  searchDefaults?: SearchSettings,
): {
  variants: HeaderSchema['blockVariants'];
  wrappers: HeaderSchema['wrappers'];
  behaviors: HeaderSchema['behaviors'];
} {
  const flat = flattenBlockVariantSettings(overlay, wrappers, {
    baseBehaviors: behaviors,
    domainDefaults: searchDefaults
      ? { search: { type: searchDefaults.type, style: searchDefaults.style } }
      : undefined,
    mapStyle: mapHeaderBlockStyle,
  });
  return {
    variants: flat.variants as HeaderSchema['blockVariants'],
    wrappers: flat.wrappers as HeaderSchema['wrappers'],
    behaviors: flat.behaviors,
  };
}

function resolveWrappers(raw: HeaderSchemaLayer['wrappers'] | undefined): HeaderSchema['wrappers'] {
  if (!raw) return { ...DEFAULT_HEADER_CONFIG.wrappers };

  const resolved: HeaderSchema['wrappers'] = {};
  for (const [key, value] of Object.entries(raw)) {
    resolved[key] = resolveWrapperMode(value, 'none');
  }
  return resolved;
}

function resolveBehavior(raw: HeaderSchemaLayer['behavior'] | undefined): HeaderSchema['behavior'] {
  return {
    sticky: raw?.sticky ?? DEFAULT_HEADER_CONFIG.behavior.sticky,
    transparent: raw?.transparent ?? DEFAULT_HEADER_CONFIG.behavior.transparent,
    hideOnScroll: raw?.hideOnScroll ?? DEFAULT_HEADER_CONFIG.behavior.hideOnScroll,
  };
}

function resolveCapabilities(
  raw: HeaderSchemaLayer['capabilities'] | undefined,
): HeaderSchema['capabilities'] {
  return {
    ...DEFAULT_HEADER_CONFIG.capabilities,
    ...raw,
  };
}

const MENU_RUNTIME_STRIP = new Set(['opened', 'onChange', 'children']);

/** Passthrough Mantine Menu props from `header.menu` (strip runtime-owned keys). */
function resolveMenu(raw: unknown): MenuSettings | undefined {
  if (!isRecord(raw)) return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (MENU_RUNTIME_STRIP.has(key)) continue;
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? (out as MenuSettings) : undefined;
}

function coerceHeaderSchema(
  merged: HeaderSchema & HeaderSchemaLayer,
  searchDefaults?: SearchSettings,
): HeaderSchema {
  const type = readSettingsKey(merged.type, DEFAULT_HEADER_CONFIG.type);
  const packDefaults = resolveHeaderTypeTunableDefaults(type);
  const wrappersFromSettings = resolveWrappers(merged.wrappers);
  const flatGlobal = flattenHeaderBlockVariants(
    merged.blockVariants,
    wrappersFromSettings,
    {},
    searchDefaults,
  );
  const flatNested = flattenHeaderBlockVariants(
    merged.types?.[type]?.blockVariants,
    flatGlobal.wrappers,
    flatGlobal.behaviors,
    searchDefaults,
  );
  const withPack = mergeBlockVariants(packDefaults.blockVariants, flatGlobal.variants);
  const blockVariants = mergeBlockVariants(withPack, flatNested.variants);
  const menu = resolveMenu(merged.menu);

  return {
    version: merged.version === 2 ? 2 : 1,
    layout: readSettingsKey(merged.layout, DEFAULT_HEADER_CONFIG.layout),
    type,
    blockVariants,
    wrappers: flatNested.wrappers,
    behaviors: flatNested.behaviors,
    behavior: resolveBehavior(merged.behavior),
    capabilities: resolveCapabilities(merged.capabilities),
    customBlocks: resolveCustomBlocks(merged),
    tooltip: resolveTooltipConfig(DEFAULT_HEADER_CONFIG.tooltip, merged.tooltip),
    ...(menu ? { menu } : {}),
    active: resolveCmfActiveConfig(merged.active, DEFAULT_HEADER_CONFIG.active),
  };
}

/**
 * Resolve header schema: defaults → global → brand → page → props.
 * Brand/page optional until sources exist.
 */
export function resolveHeaderSchema(
  layers: SchemaLayers<HeaderSchema> = {},
  searchDefaults?: SearchSettings,
): HeaderSchema {
  return resolveWidgetSchema(DEFAULT_HEADER_CONFIG, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) =>
      coerceHeaderSchema(merged as HeaderSchema & HeaderSchemaLayer, searchDefaults),
  });
}

/**
 * @deprecated Prefer `resolveHeaderSchema({ global: settings.header, props: overrides })`.
 */
export function resolveHeaderConfig(
  settings = getSettings(),
  overrides?: Partial<HeaderSettings>,
): HeaderSchema {
  return resolveHeaderSchema(
    {
      global: settings.header as Partial<HeaderSchema> | undefined,
      props: overrides as Partial<HeaderSchema> | undefined,
    },
    getSearchDefaultSpec(settings),
  );
}
