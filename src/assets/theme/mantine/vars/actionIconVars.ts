import {
  CMF_ACTION_ICON_SIZES,
  type CmfActionIconSize,
  type CmfActionIconVariant,
} from '../cmf/cmfActionIconVars';
import {
  buildCmfActionIconPropToken,
  type CmfScope,
  resolveCmfScope,
} from '../cmf/cmfCascadeResolve';
import { resolveCmfIconControlVars } from '../cmf/cmfIconControlVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';

const MANTINE_AI_BORDER_TRANSPARENT = 'calc(0.0625rem * var(--mantine-scale)) solid transparent';
const MANTINE_AI_BORDER = 'calc(0.0625rem * var(--mantine-scale)) solid var(--color-border)';

type VariantPaint = {
  bg: string;
  color: string;
  bd: string;
  hover: string;
  'hover-color': string;
};

/** Last-resort fallbacks when CMF tokens are unset. */
const MANTINE_VARIANT_FALLBACKS: Record<CmfActionIconVariant, VariantPaint> = {
  filled: {
    bg: 'var(--mantine-color-brand-4)',
    color: 'var(--mantine-primary-color-contrast)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-3)',
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  outline: {
    bg: 'transparent',
    color: 'var(--mantine-color-brand-4)',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid color-mix(in srgb, var(--mantine-color-brand-4) 42%, var(--mantine-color-default-border))',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  light: {
    bg: 'var(--mantine-color-brand-light)',
    color: 'var(--mantine-color-brand-light-color)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  subtle: {
    bg: 'transparent',
    color: 'var(--mantine-color-text)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    color: 'var(--mantine-color-default-color)',
    bd: MANTINE_AI_BORDER,
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  transparent: {
    bg: 'transparent',
    color: 'var(--mantine-color-text)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: 'transparent',
    'hover-color': 'var(--mantine-color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    color: 'var(--mantine-color-black)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: `var(--app-gradient-default, ${APP_GRADIENT_DEFAULT})`,
    color: 'var(--mantine-primary-color-contrast)',
    bd: MANTINE_AI_BORDER_TRANSPARENT,
    hover: `var(--app-gradient-default-hover, ${APP_GRADIENT_DEFAULT_HOVER})`,
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
};

function resolveActionIconSize(size: unknown): CmfActionIconSize {
  if (typeof size === 'string' && (CMF_ACTION_ICON_SIZES as readonly string[]).includes(size)) {
    return size as CmfActionIconSize;
  }
  return 'md';
}

function isCmfActionIconVariant(variant: string | undefined): variant is CmfActionIconVariant {
  return variant !== undefined && variant in MANTINE_VARIANT_FALLBACKS;
}

function resolveVariant(variant: string | undefined): CmfActionIconVariant {
  return isCmfActionIconVariant(variant) ? variant : 'default';
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

type ActionIconVarsProps = {
  size?: unknown;
  radius?: unknown;
  variant?: string;
  cmfComponent?: string;
  cmfKey?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
};

/**
 * Inline style CMF cascade (mirrors Button):
 * - with `data-cmf-*`: component(+key) → data-variant|shared
 * - without: data-variant → (shared for radius)
 * Size table (`--ai-size-sm`, …) stays in Mantine CSS as fallbacks only.
 */
export function resolveActionIconRootVars(props: ActionIconVarsProps): Record<string, string> {
  const scope: CmfScope = resolveCmfScope(props as Record<string, unknown>);
  const size = resolveActionIconSize(props.size);
  const variant = resolveVariant(props.variant);
  const paint = MANTINE_VARIANT_FALLBACKS[variant];

  return {
    '--ai-radius': resolveRadius(
      props.radius,
      buildCmfActionIconPropToken('radius', 'var(--mantine-radius-md)', {
        scope,
        variant,
        tail: 'shared',
      }),
    ),
    '--ai-size': buildCmfActionIconPropToken('size', `var(--ai-size-${size})`, {
      scope,
      variant,
      tail: 'variant',
    }),
    ...resolveCmfIconControlVars({
      scope,
      variant,
      buildToken: buildCmfActionIconPropToken,
    }),
    '--ai-bg': buildCmfActionIconPropToken('bg', paint.bg, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-color': buildCmfActionIconPropToken('color', paint.color, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-bd': buildCmfActionIconPropToken('bd', paint.bd, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-hover': buildCmfActionIconPropToken('hover', paint.hover, {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-hover-color': buildCmfActionIconPropToken('hover-color', paint['hover-color'], {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-shadow': buildCmfActionIconPropToken('shadow', 'none', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-position': buildCmfActionIconPropToken('active-position', 'bottom', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-size': buildCmfActionIconPropToken('active-size', '2px', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-color': buildCmfActionIconPropToken('active-color', 'var(--brand-color-5)', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-inset': buildCmfActionIconPropToken('active-inset', 'auto 0 0 0', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-width': buildCmfActionIconPropToken('active-width', '100%', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-height': buildCmfActionIconPropToken('active-height', '2px', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-radius': buildCmfActionIconPropToken('active-radius', 'var(--ai-radius)', {
      scope,
      variant,
      tail: 'variant',
    }),
    '--ai-active-radius-tl': buildCmfActionIconPropToken(
      'active-radius-tl',
      buildCmfActionIconPropToken('active-radius', 'var(--ai-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--ai-active-radius-tr': buildCmfActionIconPropToken(
      'active-radius-tr',
      buildCmfActionIconPropToken('active-radius', 'var(--ai-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--ai-active-radius-br': buildCmfActionIconPropToken(
      'active-radius-br',
      buildCmfActionIconPropToken('active-radius', 'var(--ai-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
    '--ai-active-radius-bl': buildCmfActionIconPropToken(
      'active-radius-bl',
      buildCmfActionIconPropToken('active-radius', 'var(--ai-radius)', {
        scope,
        variant,
        tail: 'variant',
      }),
      { scope, variant, tail: 'variant' },
    ),
  };
}
