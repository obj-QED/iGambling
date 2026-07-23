import type { CSSProperties } from 'react';

import { CMF_BUTTON_SIZES, type CmfButtonSize, type CmfButtonVariant } from '../cmf/cmfButtonVars';
import { buildCmfButtonPropToken, type CmfScope, resolveCmfScope } from '../cmf/cmfCascadeResolve';
import { resolveCmfIconControlVars } from '../cmf/cmfIconControlVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';

const MANTINE_BUTTON_BORDER = 'calc(0.0625rem * var(--mantine-scale)) solid var(--color-border)';
const MANTINE_BUTTON_BORDER_TRANSPARENT =
  'calc(0.0625rem * var(--mantine-scale)) solid transparent';

type VariantPaint = {
  bg: string;
  bd: string;
  hover: string;
  'hover-color': string;
};

/** Last-resort fallbacks when CMF tokens are unset. */
const MANTINE_VARIANT_FALLBACKS: Record<CmfButtonVariant, VariantPaint> = {
  filled: {
    bg: 'var(--mantine-color-brand-4)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-3)',
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  outline: {
    bg: 'transparent',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid color-mix(in srgb, var(--mantine-color-brand-4) 42%, var(--mantine-color-default-border))',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  light: {
    bg: 'var(--mantine-color-brand-light)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  subtle: {
    bg: 'transparent',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    bd: MANTINE_BUTTON_BORDER,
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  transparent: {
    bg: 'transparent',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'transparent',
    'hover-color': 'var(--mantine-color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: `var(--app-gradient-default, ${APP_GRADIENT_DEFAULT})`,
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: `var(--app-gradient-default-hover, ${APP_GRADIENT_DEFAULT_HOVER})`,
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  hero: {
    bg: '#059669',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: '#047857',
    'hover-color': 'var(--mantine-color-white)',
  },
  'hero-light': {
    bg: 'color-mix(in srgb, #059669 14%, transparent)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: 'color-mix(in srgb, #059669 22%, transparent)',
    'hover-color': 'var(--mantine-color-text)',
  },
  'hero-outline': {
    bg: 'transparent',
    bd: '1px solid #059669',
    hover: 'color-mix(in srgb, #059669 12%, transparent)',
    'hover-color': 'var(--mantine-color-text)',
  },
  exception: {
    bg: '#d97706',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    hover: '#b45309',
    'hover-color': 'var(--mantine-color-white)',
  },
};

const MANTINE_SIZE_FZ: Record<CmfButtonSize, string> = {
  xs: 'var(--mantine-font-size-xs)',
  sm: 'var(--mantine-font-size-sm)',
  md: 'var(--mantine-font-size-md)',
  lg: 'var(--mantine-font-size-lg)',
  xl: 'var(--mantine-font-size-xl)',
};

function resolveButtonSize(size: unknown): CmfButtonSize {
  if (typeof size === 'string' && (CMF_BUTTON_SIZES as readonly string[]).includes(size)) {
    return size as CmfButtonSize;
  }
  return 'md';
}

/** Runtime guard for finite paint keys (Mantine built-ins + CMF custom). */
export function isCmfButtonPaintVariant(variant: string): variant is CmfButtonVariant {
  return variant in MANTINE_VARIANT_FALLBACKS;
}

/** `exception-timer` → cascade as `exception` (data-variant stays `exception-*` for CSS). */
function resolveVariant(variant: string | undefined): CmfButtonVariant {
  if (typeof variant === 'string' && variant.startsWith('exception-')) {
    return 'exception';
  }
  return variant !== undefined && isCmfButtonPaintVariant(variant) ? variant : 'default';
}

type ButtonVarsProps = {
  size?: unknown;
  radius?: unknown;
  variant?: string;
  justify?: CSSProperties['justifyContent'];
  cmfComponent?: string;
  cmfKey?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
};

/** Prefer data-cmf-key; if missing, peel key from `exception-{key}`. */
function resolveButtonScope(props: ButtonVarsProps, rawVariant: string | undefined): CmfScope {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  if (scope.key !== undefined) return scope;
  if (typeof rawVariant !== 'string' || rawVariant.startsWith('exception-') === false) {
    return scope;
  }
  const key = rawVariant.slice('exception-'.length);
  return key.length > 0 ? { ...scope, key } : scope;
}

function resolveRadius(radius: unknown, cmfFallback: string): string {
  if (typeof radius === 'number' && Number.isFinite(radius)) {
    return `${radius}px`;
  }
  if (typeof radius === 'string' && radius.trim().length > 0) {
    const value = radius.trim();
    if (
      value.startsWith('var(') ||
      value.includes('rem') ||
      value.includes('px') ||
      value.includes('%')
    ) {
      return value;
    }
    return `var(--mantine-radius-${value}, var(--mantine-radius-md))`;
  }
  return cmfFallback;
}

/**
 * Inline style CMF cascade:
 * - with `data-cmf-*`: component(+key) → variant|size|shared
 * - without: variant → size → (shared for radius/justify)
 * Size table tokens (`--button-height-sm`, …) stay in Mantine CSS as fallbacks.
 */
export function resolveButtonRootVars(props: ButtonVarsProps): Record<string, string> {
  const scope = resolveButtonScope(props, props.variant);
  const size = resolveButtonSize(props.size);
  const variant = resolveVariant(props.variant);
  const paint = MANTINE_VARIANT_FALLBACKS[variant];

  return {
    '--button-justify': buildCmfButtonPropToken('justify', String(props.justify ?? 'flex-start'), {
      scope,
      variant,
      size,
      tail: 'shared',
    }),
    '--button-radius': resolveRadius(
      props.radius,
      buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
        scope,
        variant,
        size,
        tail: 'shared',
      }),
    ),
    '--button-height': buildCmfButtonPropToken('height', `var(--button-height-${size})`, {
      scope,
      variant,
      size,
      tail: 'size',
    }),
    '--button-padding-x': buildCmfButtonPropToken('padding-x', `var(--button-padding-x-${size})`, {
      scope,
      variant,
      size,
      tail: 'size',
    }),
    '--button-fz': buildCmfButtonPropToken('fz', MANTINE_SIZE_FZ[size], {
      scope,
      variant,
      size,
      tail: 'size',
    }),
    ...resolveCmfIconControlVars({
      scope,
      size,
      buildToken: buildCmfButtonPropToken,
    }),
    '--button-bg': buildCmfButtonPropToken('bg', paint.bg, {
      scope,
      variant,
      size,
      tail: 'variant',
    }),
    '--button-bd': buildCmfButtonPropToken('bd', paint.bd, {
      scope,
      variant,
      size,
      tail: 'variant',
    }),
    '--button-hover': buildCmfButtonPropToken('hover', paint.hover, {
      scope,
      variant,
      size,
      tail: 'variant',
    }),
    '--button-hover-color': buildCmfButtonPropToken('hover-color', paint['hover-color'], {
      scope,
      variant,
      size,
      tail: 'variant',
    }),
  };
}
