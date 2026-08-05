import type { CSSProperties } from 'react';

import { APP_GRADIENT_DEG } from '@/assets/theme/mantine';

type ControlKind = 'button' | 'ai';

function paintPrefix(kind: ControlKind): 'button' | 'ai' {
  return kind === 'button' ? 'button' : 'ai';
}

function resolveColorName(color: string | undefined): string {
  return color && color.trim().length > 0 ? color.trim() : 'brand';
}

/** Mantine `gradient` prop from playground `color` (shade 6 → 8). */
export function playgroundGradientFromColor(color: string | undefined): {
  from: string;
  to: string;
  deg: number;
} {
  const base = resolveColorName(color);
  return {
    from: `${base}.6`,
    to: `${base}.8`,
    deg: APP_GRADIENT_DEG,
  };
}

/**
 * Force `--button-*` / `--ai-*` paint from playground `color` for every variant.
 * Gradient also gets CSS vars (hover image) in addition to the `gradient` prop.
 */
export function playgroundPaintStyle(
  kind: ControlKind,
  variant: string | undefined,
  color: string | undefined,
): CSSProperties {
  const c = resolveColorName(color);
  const p = paintPrefix(kind);
  const v = variant && variant.trim().length > 0 ? variant.trim() : 'filled';
  const bdWidth = 'calc(0.0625rem * var(--mantine-scale))';
  const style: Record<string, string> = {};

  if (v === 'gradient') {
    style[`--${p}-bg`] =
      `linear-gradient(${APP_GRADIENT_DEG}deg, var(--mantine-color-${c}-6) 0%, var(--mantine-color-${c}-8) 100%)`;
    style[`--${p}-hover`] =
      `linear-gradient(${APP_GRADIENT_DEG}deg, var(--mantine-color-${c}-7) 0%, var(--mantine-color-${c}-9) 100%)`;
    style[`--${p}-color`] = '#fff';
    style[`--${p}-hover-color`] = '#fff';
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  if (v === 'filled') {
    style[`--${p}-bg`] = `var(--mantine-color-${c}-filled)`;
    style[`--${p}-hover`] = `var(--mantine-color-${c}-filled-hover)`;
    style[`--${p}-color`] = `var(--mantine-color-${c}-contrast, #fff)`;
    style[`--${p}-hover-color`] = `var(--mantine-color-${c}-contrast, #fff)`;
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  if (v === 'light') {
    style[`--${p}-bg`] = `var(--mantine-color-${c}-light)`;
    style[`--${p}-hover`] = `var(--mantine-color-${c}-light-hover)`;
    style[`--${p}-color`] = `var(--mantine-color-${c}-light-color)`;
    style[`--${p}-hover-color`] = `var(--mantine-color-${c}-light-color)`;
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  if (v === 'outline') {
    style[`--${p}-bg`] = 'transparent';
    style[`--${p}-hover`] = `var(--mantine-color-${c}-outline-hover)`;
    style[`--${p}-color`] = `var(--mantine-color-${c}-outline)`;
    style[`--${p}-hover-color`] = `var(--mantine-color-${c}-outline)`;
    style[`--${p}-bd`] = `${bdWidth} solid var(--mantine-color-${c}-outline)`;
    return style as CSSProperties;
  }

  if (v === 'subtle') {
    style[`--${p}-bg`] = 'transparent';
    style[`--${p}-hover`] = `var(--mantine-color-${c}-light-hover)`;
    style[`--${p}-color`] = `var(--mantine-color-${c}-light-color)`;
    style[`--${p}-hover-color`] = `var(--mantine-color-${c}-light-color)`;
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  if (v === 'transparent') {
    style[`--${p}-bg`] = 'transparent';
    style[`--${p}-hover`] = 'transparent';
    style[`--${p}-color`] =
      `var(--mantine-color-${c}-light-color, var(--mantine-color-${c}-filled))`;
    style[`--${p}-hover-color`] = `var(--mantine-color-${c}-filled)`;
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  if (v === 'white') {
    style[`--${p}-bg`] = 'var(--mantine-color-white)';
    style[`--${p}-hover`] = 'var(--mantine-color-white)';
    style[`--${p}-color`] = `var(--mantine-color-${c}-filled)`;
    style[`--${p}-hover-color`] =
      `var(--mantine-color-${c}-filled-hover, var(--mantine-color-${c}-filled))`;
    style[`--${p}-bd`] = `${bdWidth} solid transparent`;
    return style as CSSProperties;
  }

  // default (and unknown): tint hover / label from color
  style[`--${p}-hover`] = `var(--mantine-color-${c}-light-hover)`;
  style[`--${p}-color`] = `var(--mantine-color-${c}-text, var(--color-text))`;
  style[`--${p}-hover-color`] = `var(--mantine-color-${c}-text, var(--color-text))`;
  return style as CSSProperties;
}
