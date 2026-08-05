import type { CmfControlAttrsInput } from './types';

import { menuApiTypeAttrs } from '@/shared/lib/menu/menuApiTypeAttrs';

import { cmfControlAttrs } from './cmfControlAttrs';

export type ControlAttrsItem = {
  key?: string;
  type?: unknown;
};

export type ControlAttrsOptions = CmfControlAttrsInput & {
  /** When true (default), emit `data-key` from `item.key` for identity / analytics. */
  dataKey?: boolean;
};

/**
 * Control attrs for AppButton / AppActionIcon / triggers:
 * optional identity `data-key` + CMF cascade (`cmfControlAttrs`) + API `api-type`.
 */
export function controlAttrs(
  item: ControlAttrsItem,
  cmf: ControlAttrsOptions = {},
): Record<string, string> {
  const { dataKey = true, component, key, role } = cmf;
  const itemKey = typeof item.key === 'string' ? item.key.trim() : '';
  const cascadeKey = key?.trim() || itemKey;

  return {
    ...(dataKey && itemKey.length > 0 ? { 'data-key': itemKey } : {}),
    ...cmfControlAttrs({
      component,
      key: cascadeKey.length > 0 ? cascadeKey : undefined,
      role,
    }),
    ...menuApiTypeAttrs(item.type),
  };
}
