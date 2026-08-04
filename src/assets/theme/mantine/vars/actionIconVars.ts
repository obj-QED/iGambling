import { CMF_ACTION_ICON_SIZES, type CmfActionIconSize } from '../cmf/cmfActionIconVars';
import {
  buildCmfActionIconPropToken,
  type CmfScope,
  resolveCmfScope,
} from '../cmf/cmfCascadeResolve';
import { resolveCmfIconControlVars } from '../cmf/cmfIconControlVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';

/** `--ai-bd` / CMF `*-bd` are border-color only (width+style in CSS). */
const MANTINE_AI_BD_TRANSPARENT = 'transparent';
const MANTINE_AI_BD_DEFAULT = 'var(--color-border)';
const MANTINE_AI_BD_OUTLINE =
  'color-mix(in srgb, var(--brand-color-7) 55%, var(--mantine-color-default-border))';

type VariantPaint = {
  bg: string;
  color: string;
  /** Border color only — not a full `border` shorthand. */
  bd: string;
  hover: string;
  'hover-color': string;
};

/** Last-resort paint when CMF tokens are unset. Keep in sync with cascade `$cmf-button-variants`. */
const MANTINE_VARIANT_FALLBACKS = {
  filled: {
    bg: 'light-dark(var(--brand-color-7), var(--brand-color-8))',
    color: '#fff',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: 'light-dark(var(--brand-color-6), var(--brand-color-7))',
    'hover-color': '#fff',
  },
  outline: {
    bg: 'transparent',
    color: 'light-dark(var(--brand-color-7), var(--brand-color-3))',
    bd: MANTINE_AI_BD_OUTLINE,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--color-text)',
  },
  light: {
    bg: 'var(--mantine-color-brand-light)',
    color: 'light-dark(var(--brand-color-8), var(--brand-color-2))',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'light-dark(var(--brand-color-8), var(--brand-color-2))',
  },
  subtle: {
    bg: 'transparent',
    color: 'var(--color-text)',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    color: 'var(--mantine-color-default-color)',
    bd: MANTINE_AI_BD_DEFAULT,
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--color-text)',
  },
  transparent: {
    bg: 'transparent',
    color: 'var(--color-text)',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: 'transparent',
    'hover-color': 'var(--color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    color: 'var(--mantine-color-black)',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: `var(--app-gradient-default, ${APP_GRADIENT_DEFAULT})`,
    color: '#fff',
    bd: MANTINE_AI_BD_TRANSPARENT,
    hover: `var(--app-gradient-default-hover, ${APP_GRADIENT_DEFAULT_HOVER})`,
    'hover-color': '#fff',
  },
} as const satisfies Record<string, VariantPaint>;

type CmfActionIconPaintKey = keyof typeof MANTINE_VARIANT_FALLBACKS;

type ResolvedActionIconVariant = {
  cascade: string;
  paint: VariantPaint;
};

function resolveActionIconSize(size: unknown): CmfActionIconSize {
  if (typeof size === 'string' && (CMF_ACTION_ICON_SIZES as readonly string[]).includes(size)) {
    return size as CmfActionIconSize;
  }
  return 'md';
}

function isCmfActionIconPaintVariant(variant: string): variant is CmfActionIconPaintKey {
  return Object.hasOwn(MANTINE_VARIANT_FALLBACKS, variant);
}

/** Custom variants keep cascade name; paint last-resort = Mantine `default`. */
function resolveVariant(variant: string | undefined): ResolvedActionIconVariant {
  if (variant !== undefined && isCmfActionIconPaintVariant(variant)) {
    return { cascade: variant, paint: MANTINE_VARIANT_FALLBACKS[variant] };
  }
  if (typeof variant === 'string' && variant.trim().length > 0) {
    return { cascade: variant.trim(), paint: MANTINE_VARIANT_FALLBACKS.default };
  }
  return { cascade: 'default', paint: MANTINE_VARIANT_FALLBACKS.default };
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
  cmfRole?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-cmf-role'?: string;
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
  const { cascade: variant, paint } = resolveVariant(props.variant);

  return {
    '--ai-radius': resolveRadius(
      props.radius,
      buildCmfActionIconPropToken('radius', 'var(--mantine-radius-md)', {
        scope,
        variant,
        tail: 'shared',
      }),
    ),
    '--ai-radius-disabled': buildCmfActionIconPropToken('radius-disabled', 'var(--ai-radius)', {
      scope,
      variant,
      tail: 'shared',
    }),
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
    '--ai-bd-width': buildCmfActionIconPropToken(
      'bd-width',
      'calc(0.0625rem * var(--mantine-scale))',
      {
        scope,
        variant,
        tail: 'variant',
      },
    ),
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
