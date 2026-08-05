import type { CSSProperties } from 'react';

import { CMF_BUTTON_SIZES, type CmfButtonSize } from '../cmf/cmfButtonVars';
import { buildCmfButtonPropToken, resolveCmfScope } from '../cmf/cmfCascadeResolve';
import { resolveCmfIconControlVars } from '../cmf/cmfIconControlVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';

/** `--button-bd` / CMF `*-bd` are border-color only (width+style in CSS). */
const MANTINE_BUTTON_BD_TRANSPARENT = 'transparent';
const MANTINE_BUTTON_BD_DEFAULT = 'var(--color-border)';
const MANTINE_BUTTON_BD_OUTLINE =
  'color-mix(in srgb, var(--brand-color-7) 55%, var(--mantine-color-default-border))';

type VariantPaint = {
  bg: string;
  color: string;
  /** Border color only — not a full `border` shorthand. */
  bd: string;
  hover: string;
  'hover-color': string;
};

/**
 * Last-resort paint when CMF tokens are unset.
 * Known keys = Mantine built-ins only. Unknown custom `data-variant` reuses `default` paint
 * and still cascades by name (`--cmf-button-{variant}-*`). Prefer `data-cmf-key` tokens for menu CTAs.
 * Keep in sync with `_cmf-control-cascade.scss` `$cmf-button-variants`.
 */
const MANTINE_VARIANT_FALLBACKS = {
  filled: {
    bg: 'light-dark(var(--brand-color-7), var(--brand-color-8))',
    color: '#fff',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: 'light-dark(var(--brand-color-6), var(--brand-color-7))',
    'hover-color': '#fff',
  },
  outline: {
    bg: 'transparent',
    color: 'light-dark(var(--brand-color-7), var(--brand-color-3))',
    bd: MANTINE_BUTTON_BD_OUTLINE,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--color-text)',
  },
  light: {
    bg: 'var(--mantine-color-brand-light)',
    color: 'light-dark(var(--brand-color-8), var(--brand-color-2))',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'light-dark(var(--brand-color-8), var(--brand-color-2))',
  },
  subtle: {
    bg: 'transparent',
    color: 'var(--color-text)',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    color: 'var(--mantine-color-default-color)',
    bd: MANTINE_BUTTON_BD_DEFAULT,
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--color-text)',
  },
  transparent: {
    bg: 'transparent',
    color: 'var(--color-text)',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: 'transparent',
    'hover-color': 'var(--color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    color: 'var(--mantine-color-black)',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: `var(--app-gradient-default, ${APP_GRADIENT_DEFAULT})`,
    color: '#fff',
    bd: MANTINE_BUTTON_BD_TRANSPARENT,
    hover: `var(--app-gradient-default-hover, ${APP_GRADIENT_DEFAULT_HOVER})`,
    'hover-color': '#fff',
  },
} as const satisfies Record<string, VariantPaint>;

type CmfButtonPaintKey = keyof typeof MANTINE_VARIANT_FALLBACKS;

type ResolvedButtonVariant = {
  /** Cascade segment: `--cmf-button-{cascade}-*` (may differ from `data-variant`). */
  cascade: string;
  paint: VariantPaint;
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

/** Runtime guard for finite Mantine paint keys. */
export function isCmfButtonPaintVariant(variant: string): variant is CmfButtonPaintKey {
  return Object.hasOwn(MANTINE_VARIANT_FALLBACKS, variant);
}

/**
 * Custom `data-variant` → shorter token segment.
 * e.g. `button-link` → `--cmf-button-link-*` (not `--cmf-button-button-link-*`).
 */
const CUSTOM_VARIANT_CASCADE: Record<string, string> = {
  'button-link': 'link',
};

/**
 * Cascade key = data-variant name, unless aliased in {@link CUSTOM_VARIANT_CASCADE}.
 * Unknown custom variants keep their name in cascade; paint last-resort = Mantine `default`.
 */
function resolveVariant(variant: string | undefined): ResolvedButtonVariant {
  if (variant !== undefined && isCmfButtonPaintVariant(variant)) {
    return { cascade: variant, paint: MANTINE_VARIANT_FALLBACKS[variant] };
  }
  if (typeof variant === 'string' && variant.trim().length > 0) {
    const name = variant.trim();
    return {
      cascade: CUSTOM_VARIANT_CASCADE[name] ?? name,
      paint: MANTINE_VARIANT_FALLBACKS.default,
    };
  }
  return { cascade: 'default', paint: MANTINE_VARIANT_FALLBACKS.default };
}

type ButtonVarsProps = {
  size?: unknown;
  radius?: unknown;
  variant?: string;
  justify?: CSSProperties['justifyContent'];
  cmfComponent?: string;
  cmfKey?: string;
  cmfRole?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
};

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
 * - with `data-cmf-*`: component(+key) → data-variant|shared
 * - without: data-variant → (shared for radius/justify)
 * Size table tokens (`--button-height-sm`, …) stay in Mantine CSS as fallbacks only.
 */
export function resolveButtonRootVars(props: ButtonVarsProps): Record<string, string> {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  const size = resolveButtonSize(props.size);
  const { cascade: variant, paint } = resolveVariant(props.variant);

  return {
    '--button-justify': buildCmfButtonPropToken('justify', String(props.justify ?? 'flex-start'), {
      scope,
      variant,
      tail: 'shared',
    }),
    '--button-radius': resolveRadius(
      props.radius,
      buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
        scope,
        variant,
        tail: 'shared',
      }),
    ),
    '--button-radius-disabled': buildCmfButtonPropToken('radius-disabled', 'var(--button-radius)', {
      scope,
      variant,
      tail: 'shared',
    }),
    '--button-height': buildCmfButtonPropToken('height', `var(--button-height-${size})`, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-padding-x': buildCmfButtonPropToken('padding-x', `var(--button-padding-x-${size})`, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-fz': buildCmfButtonPropToken('fz', MANTINE_SIZE_FZ[size], {
      scope,
      variant,
      tail: 'variant',
    }),
    ...resolveCmfIconControlVars({
      scope,
      variant,
      buildToken: buildCmfButtonPropToken,
    }),
    '--button-bg': buildCmfButtonPropToken('bg', paint.bg, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-color': buildCmfButtonPropToken('color', paint.color, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-bd': buildCmfButtonPropToken('bd', paint.bd, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-bd-width': buildCmfButtonPropToken(
      'bd-width',
      'calc(0.0625rem * var(--mantine-scale))',
      {
        scope,
        variant,
        tail: 'variant',
      },
    ),
    '--button-hover': buildCmfButtonPropToken('hover', paint.hover, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-hover-color': buildCmfButtonPropToken('hover-color', paint['hover-color'], {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-shadow': buildCmfButtonPropToken('shadow', 'none', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-position': buildCmfButtonPropToken('active-position', 'bottom', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-size': buildCmfButtonPropToken('active-size', '2px', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-color': buildCmfButtonPropToken('active-color', 'var(--brand-color-5)', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-inset': buildCmfButtonPropToken('active-inset', 'auto 0 0 0', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-width': buildCmfButtonPropToken('active-width', '100%', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-height': buildCmfButtonPropToken('active-height', '2px', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-radius': buildCmfButtonPropToken('active-radius', 'var(--button-radius)', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-active-radius-tl': buildCmfButtonPropToken(
      'active-radius-tl',
      buildCmfButtonPropToken('active-radius', 'var(--button-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--button-active-radius-tr': buildCmfButtonPropToken(
      'active-radius-tr',
      buildCmfButtonPropToken('active-radius', 'var(--button-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--button-active-radius-br': buildCmfButtonPropToken(
      'active-radius-br',
      buildCmfButtonPropToken('active-radius', 'var(--button-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--button-active-radius-bl': buildCmfButtonPropToken(
      'active-radius-bl',
      buildCmfButtonPropToken('active-radius', 'var(--button-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
  };
}

/**
 * Paint + radius bridge for custom `data-variant` (`hero`, `button-link`, …).
 * Size / icons stay on Mantine defaults — avoids the fat dump from
 * {@link resolveButtonRootVars} (widget `data-cmf-*` uses CSS cascade instead).
 *
 * Radius is required: Mantine only emits `--button-radius` when `radius` prop is set
 * (`radius === undefined → void 0`), so custom variants would otherwise miss it.
 */
export function resolveButtonCustomVariantPaintVars(
  props: ButtonVarsProps,
): Record<string, string> {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  const { cascade: variant, paint } = resolveVariant(props.variant);

  return {
    '--button-radius': resolveRadius(
      props.radius,
      buildCmfButtonPropToken('radius', 'var(--mantine-radius-md)', {
        scope,
        variant,
        tail: 'shared',
      }),
    ),
    '--button-bg': buildCmfButtonPropToken('bg', paint.bg, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-color': buildCmfButtonPropToken('color', paint.color, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-bd': buildCmfButtonPropToken('bd', paint.bd, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-hover': buildCmfButtonPropToken('hover', paint.hover, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--button-hover-color': buildCmfButtonPropToken('hover-color', paint['hover-color'], {
      scope,
      variant,
      tail: 'variant',
    }),
  };
}
