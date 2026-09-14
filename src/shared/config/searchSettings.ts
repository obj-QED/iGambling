import type { BlockVariantSpec } from './blockVariantSpec';
import type { ModalSettings } from './overlaySettings';

import { isRecord, readString } from '@/shared/lib/coercion';

import { getSettings } from './settings';

/**
 * Global search behavior from `params.search`.
 * Applies to every search trigger (header `search`, aside `search_leftmenu`, …)
 * unless overridden in widget `blockVariants`.
 *
 * - `type` — how search opens: `modal` | `spotlight` | `input`
 * - `style` — trigger chrome: `compact` | `icon` | `input`
 * - `modal` — Modal prop overrides (cascade: `params.modal` → `params.search.modal`)
 */
export type SearchSettings = BlockVariantSpec & {
  type?: 'modal' | 'spotlight' | 'input' | string;
  style?: 'compact' | 'icon' | 'input' | 'button' | string;
  modal?: ModalSettings;
};

export function readSearchSettings(raw: unknown): SearchSettings | undefined {
  if (!isRecord(raw)) return undefined;
  const type = readString(raw.type).trim();
  const style = readString(raw.style).trim();
  if (type.length === 0 && style.length === 0) return undefined;
  return {
    ...(type.length > 0 ? { type } : {}),
    ...(style.length > 0 ? { style } : {}),
  };
}

/** Safe `params.search` → global search defaults. */
export function getSearchDefaultSpec(settings = getSettings()): SearchSettings | undefined {
  return readSearchSettings(settings.params?.search);
}

/** Header search adapter keys: `compact` | `input`. */
export function mapHeaderSearchStyle(style: string | undefined): string | undefined {
  if (style === undefined || style.length === 0) return undefined;
  if (style === 'input' || style === 'button') return 'input';
  if (style === 'compact' || style === 'icon') return 'compact';
  return style;
}

/** Header wallet adapter keys: `compact` | `full`. */
export function mapHeaderWalletStyle(style: string | undefined): string | undefined {
  if (style === undefined || style.length === 0) return undefined;
  if (style === 'full' || style === 'input') return 'full';
  if (style === 'compact' || style === 'button') return 'compact';
  return style;
}

/** Aside search adapter keys: `row` | `icon`. */
export function mapAsideSearchStyle(style: string | undefined): string | undefined {
  if (style === undefined || style.length === 0) return undefined;
  if (style === 'input' || style === 'row') return 'row';
  if (style === 'compact' || style === 'icon' || style === 'button') return 'icon';
  return style;
}

/** True when settings `type` opens a global overlay (modal / spotlight). */
export function isSearchOverlayBehavior(type: string | undefined): boolean {
  return type === 'modal' || type === 'spotlight';
}

/** True when settings `type` uses inline input + page results swap. */
export function isSearchInputBehavior(type: string | undefined): boolean {
  return type === 'input';
}

/** True when resolved block behavior opens Mantine Spotlight. */
export function isSpotlightSearchBehavior(type: string | undefined): boolean {
  return type === 'spotlight';
}
