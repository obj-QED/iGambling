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
 * Unknown Mantine Tooltip keys from settings are shallow-merged when present.
 */
export function resolveTooltipConfig(...layers: Array<TooltipSettings | undefined>): TooltipConfig {
  let current: TooltipConfig = { ...DEFAULT_TOOLTIP_CONFIG };

  for (const layer of layers) {
    if (!layer) continue;

    const { enabled, delay, openDelay, position, withArrow, offset, ...rest } = layer;

    current = {
      ...current,
      ...rest,
      enabled: enabled ?? current.enabled,
      position: pickUnionValue(TOOLTIP_POSITIONS, position, current.position),
      delay: resolveFiniteNumber(delay ?? openDelay, current.delay),
      withArrow: withArrow ?? current.withArrow,
      offset: resolveFiniteNumber(offset, current.offset),
    };
  }

  return current;
}
