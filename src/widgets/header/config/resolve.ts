import type { HeaderSchema } from '../types';
import type { MenuItemDto } from '@/shared/types/menu';

import {
  getSettings,
  type HeaderBlockVariantSettings,
  type HeaderCustomBlockConfig,
  type HeaderCustomBlockInput,
  type HeaderCustomBlockSettings,
  type HeaderSettings,
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
  layer: HeaderBlockVariantSettings | undefined,
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

/**
 * Legacy blockVariants `drawer` / `modal` → wrappers + compact content variant.
 * Other keys/values stay as given in settings.
 */
function remapLegacyOverlayVariants(
  overlay: HeaderBlockVariantSettings | undefined,
  wrappers: HeaderSchema['wrappers'],
): { overlay: HeaderBlockVariantSettings | undefined; wrappers: HeaderSchema['wrappers'] } {
  if (!overlay) return { overlay, wrappers };

  const nextVariants = { ...overlay };
  const nextWrappers = { ...wrappers };

  if (nextVariants.wallet === 'drawer') {
    nextWrappers.wallet = nextWrappers.wallet ?? 'drawer';
    nextVariants.wallet = 'compact';
  }

  if (nextVariants.search === 'modal') {
    nextWrappers.search = nextWrappers.search ?? 'modal';
    nextVariants.search = 'compact';
  }

  return { overlay: nextVariants, wrappers: nextWrappers };
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

function coerceHeaderSchema(merged: HeaderSchema & HeaderSchemaLayer): HeaderSchema {
  const type = readSettingsKey(merged.type, DEFAULT_HEADER_CONFIG.type);
  const packDefaults = resolveHeaderTypeTunableDefaults(type);
  const wrappersFromSettings = resolveWrappers(merged.wrappers);
  const remappedLegacy = remapLegacyOverlayVariants(merged.blockVariants, wrappersFromSettings);
  const remappedNested = remapLegacyOverlayVariants(
    merged.types?.[type]?.blockVariants,
    remappedLegacy.wrappers,
  );
  const withLegacy = mergeBlockVariants(packDefaults.blockVariants, remappedLegacy.overlay);
  const blockVariants = mergeBlockVariants(withLegacy, remappedNested.overlay);

  return {
    version: merged.version === 2 ? 2 : 1,
    layout: readSettingsKey(merged.layout, DEFAULT_HEADER_CONFIG.layout),
    type,
    blockVariants,
    wrappers: remappedNested.wrappers,
    behavior: resolveBehavior(merged.behavior),
    capabilities: resolveCapabilities(merged.capabilities),
    customBlocks: resolveCustomBlocks(merged),
    tooltip: resolveTooltipConfig(DEFAULT_HEADER_CONFIG.tooltip, merged.tooltip),
    active: resolveCmfActiveConfig(merged.active, DEFAULT_HEADER_CONFIG.active),
  };
}

/**
 * Resolve header schema: defaults → global → brand → page → props.
 * Brand/page optional until sources exist.
 */
export function resolveHeaderSchema(layers: SchemaLayers<HeaderSchema> = {}): HeaderSchema {
  return resolveWidgetSchema(DEFAULT_HEADER_CONFIG, layers, {
    supportedVersions: [1, 2],
    coerce: (merged) => coerceHeaderSchema(merged as HeaderSchema & HeaderSchemaLayer),
  });
}

/**
 * @deprecated Prefer `resolveHeaderSchema({ global: settings.header, props: overrides })`.
 */
export function resolveHeaderConfig(
  settings = getSettings(),
  overrides?: Partial<HeaderSettings>,
): HeaderSchema {
  return resolveHeaderSchema({
    global: settings.header as Partial<HeaderSchema> | undefined,
    props: overrides as Partial<HeaderSchema> | undefined,
  });
}
