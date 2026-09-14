import type { SearchSettings } from '@/shared/config';

import { getSearchDefaultSpec } from '@/shared/config';

import { SEARCH_TYPE_KEYS, type SearchTypeKey } from '../type/keys';
import { SEARCH_STYLE_KEYS, type SearchStyleKey } from './styleKeys';

export type SearchBehaviorType = SearchTypeKey;

export type SearchSchema = {
  /** Behavior host: `modal` | `spotlight` | `input`. */
  type: SearchTypeKey;
  /** Trigger chrome: `compact` | `icon` | `input`. */
  style: SearchStyleKey;
};

export const DEFAULT_SEARCH_SCHEMA: SearchSchema = {
  type: 'modal',
  style: 'input',
};

function coerceType(raw: string | undefined): SearchTypeKey {
  if (raw === 'spotlight' || raw === 'input' || raw === 'modal') return raw;
  return DEFAULT_SEARCH_SCHEMA.type;
}

function coerceStyle(raw: string | undefined): SearchStyleKey {
  if (raw === undefined || raw.length === 0) return DEFAULT_SEARCH_SCHEMA.style;
  if ((SEARCH_STYLE_KEYS as readonly string[]).includes(raw)) {
    return raw as SearchStyleKey;
  }
  // Legacy aliases used by header/aside maps.
  if (raw === 'button') return 'input';
  if (raw === 'row') return 'input';
  return DEFAULT_SEARCH_SCHEMA.style;
}

/** Resolve app-level search schema from `params.search`. */
export function resolveSearchSchema(spec?: SearchSettings): SearchSchema {
  const fromSettings = spec ?? getSearchDefaultSpec();
  return {
    type: coerceType(fromSettings?.type),
    style: coerceStyle(fromSettings?.style),
  };
}

export {
  SEARCH_STYLE_COMPACT,
  SEARCH_STYLE_ICON,
  SEARCH_STYLE_INPUT,
  SEARCH_STYLE_KEYS,
  SEARCH_STYLE_REGISTRY,
} from './styleKeys';
export { SEARCH_TYPE_KEYS };
export type { SearchStyleKey } from './styleKeys';
export type { SearchTypeKey };
