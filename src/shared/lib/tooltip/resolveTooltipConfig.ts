import {
  DEFAULT_TOOLTIP_CONFIG,
  TOOLTIP_POSITIONS,
  type TooltipConfig,
  type TooltipSettings,
} from '@/shared/config/tooltipSettings';
import { pickUnionValue } from '@/shared/lib/coercion';

function resolveFiniteNumber(raw: unknown, fallback: number): number {
  return Number.isFinite(raw) ? Math.max(0, Math.round(raw as number)) : fallback;
}

/**
 * Merge tooltip settings layers (later wins).
 * Example: pack → `aside.tooltip` → place override (`items`, `search`, …).
 */
export function resolveTooltipConfig(...layers: Array<TooltipSettings | undefined>): TooltipConfig {
  let current: TooltipConfig = { ...DEFAULT_TOOLTIP_CONFIG };

  for (const layer of layers) {
    if (!layer) continue;

    current = {
      enabled: layer.enabled ?? current.enabled,
      position: pickUnionValue(TOOLTIP_POSITIONS, layer.position, current.position),
      delay: resolveFiniteNumber(layer.delay, current.delay),
      withArrow: layer.withArrow ?? current.withArrow,
      offset: resolveFiniteNumber(layer.offset, current.offset),
    };
  }

  return current;
}
