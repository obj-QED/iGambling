import { pickUnionValue } from '@/shared/lib/coercion';

import { getSettings } from './settings';

/** Main page column shell — Mantine `Container` vs fluid. */
export const OUTLET_LAYOUT_KEYS = ['container', 'container-fluid'] as const;

export type OutletLayoutKey = (typeof OUTLET_LAYOUT_KEYS)[number];

export type OutletSettings = {
  /**
   * Page column width mode inside `AppLayout` main.
   * - `container` — bounded `Container` (`size="responsive"`)
   * - `container-fluid` — full-bleed (`fluid`)
   * Omit / unknown → `container`.
   */
  layout?: string;
};

/** Resolve `params.outlet.layout`; default `container`. */
export function resolveOutletLayout(
  settings: { params?: { outlet?: OutletSettings } } = getSettings(),
): OutletLayoutKey {
  return pickUnionValue(
    OUTLET_LAYOUT_KEYS,
    settings.params?.outlet?.layout as OutletLayoutKey | undefined,
    'container',
  );
}
