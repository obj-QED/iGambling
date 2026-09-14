import type { WrapperMode } from '@/shared/schema';

import { isRecord, pickUnionValue, readString } from '@/shared/lib/coercion';
import { WRAPPER_MODES } from '@/shared/schema';

/**
 * Settings SoT for special-block chrome:
 * - `type` — behavior (modal / spotlight / input / drawer / …)
 * - `style` — trigger / paint adapter (compact / input / icon / …)
 *
 * Legacy: plain string → treated as `style` (and overlay names remapped in widget resolve).
 */
export type BlockVariantSpec = {
  type?: string;
  style?: string;
};

/** `window.__SETTINGS__` value: string (legacy) or `{ type, style }`. */
export type BlockVariantSettingsValue = string | BlockVariantSpec;

export type BlockVariantSettingsMap = Partial<Record<string, BlockVariantSettingsValue>>;

const OVERLAY_TYPES = ['modal', 'drawer', 'popover', 'dropdown', 'tooltip'] as const;

/** Map settings `type` → wrapper mode. `spotlight` / `input` → no overlay wrapper. */
export function blockVariantTypeToWrapper(type: string | undefined): WrapperMode | undefined {
  if (type === undefined || type.length === 0) return undefined;
  if (type === 'input' || type === 'spotlight' || type === 'none') return 'none';
  if (type === 'dropdown') return 'popover';
  return pickUnionValue(WRAPPER_MODES, type as WrapperMode, 'none');
}

export function readBlockVariantSpec(
  raw: unknown,
  fallback: BlockVariantSpec = {},
): BlockVariantSpec {
  if (typeof raw === 'string') {
    const value = raw.trim();
    if (value.length === 0) return { ...fallback };
    // Legacy overlay-as-variant (`modal` / `drawer`) → type; keep a chrome style.
    if ((OVERLAY_TYPES as readonly string[]).includes(value)) {
      return { type: value, style: fallback.style ?? 'compact' };
    }
    return { type: fallback.type, style: value };
  }
  if (!isRecord(raw)) return { ...fallback };
  const type = readString(raw.type).trim() || fallback.type;
  const style = readString(raw.style).trim() || fallback.style;
  return { type, style };
}

export type FlattenBlockVariantsResult = {
  /** Adapter keys only (strings) for `useAdapter`. */
  variants: Partial<Record<string, string>>;
  wrappers: Partial<Record<string, WrapperMode>>;
  /** Settings `type` per domain (`modal` | `spotlight` | `input` | …). */
  behaviors: Partial<Record<string, string>>;
};

type FlattenOptions = {
  /** Alias map: settings key → schema `blockVariants` / `wrappers` domain. */
  aliases?: Readonly<Record<string, string>>;
  /** Global defaults per domain (e.g. `params.search` → `search`). */
  domainDefaults?: Readonly<Record<string, BlockVariantSpec>>;
  /** Seed behaviors (later layers overwrite). */
  baseBehaviors?: Partial<Record<string, string>>;
  /**
   * Map settings `style` → registered adapter key for a domain.
   * Omit → use style string as-is.
   */
  mapStyle?: (
    domain: string,
    style: string | undefined,
    type: string | undefined,
  ) => string | undefined;
};

function applySpecToMaps(
  domain: string,
  spec: BlockVariantSpec,
  variants: Partial<Record<string, string>>,
  wrappers: Partial<Record<string, WrapperMode>>,
  behaviors: Partial<Record<string, string>>,
  mapStyle: FlattenOptions['mapStyle'],
): void {
  const style = mapStyle !== undefined ? mapStyle(domain, spec.style, spec.type) : spec.style;
  if (typeof style === 'string' && style.length > 0) {
    variants[domain] = style;
  }
  const wrapper = blockVariantTypeToWrapper(spec.type);
  if (wrapper !== undefined) {
    wrappers[domain] = wrapper;
  }
  if (typeof spec.type === 'string' && spec.type.length > 0) {
    behaviors[domain] = spec.type;
  }
}

/**
 * Flatten settings `blockVariants` (string | `{type,style}`) → adapter strings + wrappers + behaviors.
 * Later keys win. Aliases apply before domain merge (e.g. `search_leftmenu` → `search`).
 */
export function flattenBlockVariantSettings(
  overlay: BlockVariantSettingsMap | undefined,
  baseWrappers: Partial<Record<string, WrapperMode>> = {},
  options: FlattenOptions = {},
): FlattenBlockVariantsResult {
  const variants: Partial<Record<string, string>> = {};
  const wrappers: Partial<Record<string, WrapperMode>> = { ...baseWrappers };
  const behaviors: Partial<Record<string, string>> = { ...(options.baseBehaviors ?? {}) };
  const aliases = options.aliases ?? {};
  const domainDefaults = options.domainDefaults ?? {};
  const mapStyle = options.mapStyle;

  const domains = new Set<string>([
    ...Object.keys(domainDefaults),
    ...Object.keys(overlay ?? {}).map((key) => aliases[key] ?? key),
  ]);

  for (const domain of domains) {
    const fallback = domainDefaults[domain] ?? {};
    // Prefer explicit domain key; else first alias that maps here.
    let raw: unknown = overlay?.[domain];
    if (raw === undefined && overlay) {
      for (const [settingsKey, target] of Object.entries(aliases)) {
        if (target === domain && overlay[settingsKey] !== undefined) {
          raw = overlay[settingsKey];
          break;
        }
      }
    }
    applySpecToMaps(
      domain,
      readBlockVariantSpec(raw, fallback),
      variants,
      wrappers,
      behaviors,
      mapStyle,
    );
  }

  // Pass through leftovers outside domainDefaults/aliases (e.g. `promo: 'row'`).
  if (overlay) {
    for (const [key, value] of Object.entries(overlay)) {
      const domain = aliases[key] ?? key;
      if (variants[domain] !== undefined) continue;
      applySpecToMaps(domain, readBlockVariantSpec(value), variants, wrappers, behaviors, mapStyle);
    }
  }

  return { variants, wrappers, behaviors };
}
