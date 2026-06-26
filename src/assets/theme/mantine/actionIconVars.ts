import type { MantineTheme } from '@mantine/core';

import {
  cmfActionIconDisabledToken,
  cmfActionIconLoadingToken,
  type CmfActionIconSize,
  cmfActionIconSizeToken,
  cmfActionIconToken,
  type CmfActionIconVariant,
  type CmfActionIconVariantCoreProp,
  cmfActionIconVariantToken,
} from './cmfActionIconVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from './gradientTokens';
import {
  type MantineVariantColorProps,
  resolveMantineVariantColorVars,
} from './mantineVariantColorVars';

const MANTINE_ACTION_ICON_BORDER_TRANSPARENT =
  'calc(0.0625rem * var(--mantine-scale)) solid transparent';

const MANTINE_VARIANT_FALLBACKS: Record<
  CmfActionIconVariant,
  Record<CmfActionIconVariantCoreProp, string>
> = {
  filled: {
    bg: 'var(--mantine-color-brand-4)',
    hover: 'var(--mantine-color-brand-3)',
    color: 'var(--mantine-primary-color-contrast)',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  outline: {
    bg: 'transparent',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid color-mix(in srgb, var(--mantine-color-brand-4) 42%, var(--mantine-color-default-border))',
    color: 'var(--mantine-color-text)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  light: {
    bg: 'var(--mantine-color-brand-light)',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-brand-light-color)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  subtle: {
    bg: 'transparent',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-dimmed)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)',
    color: 'var(--mantine-color-text)',
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  transparent: {
    bg: 'transparent',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-text)',
    hover: 'transparent',
    'hover-color': 'var(--mantine-color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-black)',
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: 'var(--app-gradient-default, ' + APP_GRADIENT_DEFAULT + ')',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-primary-color-contrast)',
    hover: 'var(--app-gradient-default-hover, ' + APP_GRADIENT_DEFAULT_HOVER + ')',
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  hero: {
    bg: 'var(--mantine-color-default)',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid var(--color-border)',
    color: 'var(--mantine-color-text)',
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  'hero-light': {
    bg: 'var(--mantine-color-brand-light)',
    bd: MANTINE_ACTION_ICON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-brand-light-color)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  'hero-outline': {
    bg: 'transparent',
    bd: 'calc(0.0625rem * var(--mantine-scale)) solid var(--color-border)',
    color: 'var(--mantine-color-text)',
    hover: 'color-mix(in srgb, var(--mantine-color-brand-4) 8%, transparent)',
    'hover-color': 'var(--mantine-color-text)',
  },
};

const MANTINE_SIZE_FALLBACKS: Record<CmfActionIconSize, string> = {
  xs: 'calc(1.125rem * var(--mantine-scale))',
  sm: 'calc(1.375rem * var(--mantine-scale))',
  md: 'calc(1.75rem * var(--mantine-scale))',
  lg: 'calc(2.125rem * var(--mantine-scale))',
  xl: 'calc(2.75rem * var(--mantine-scale))',
  'input-xs': 'calc(1.875rem * var(--mantine-scale))',
  'input-sm': 'calc(2.25rem * var(--mantine-scale))',
  'input-md': 'calc(2.625rem * var(--mantine-scale))',
  'input-lg': 'calc(3.125rem * var(--mantine-scale))',
  'input-xl': 'calc(3.75rem * var(--mantine-scale))',
};

const MANTINE_DISABLED_FALLBACKS = {
  bg: 'var(--mantine-color-disabled)',
  color: 'var(--mantine-color-disabled-color)',
  hover: 'var(--mantine-color-disabled)',
  'hover-color': 'var(--mantine-color-disabled-color)',
} as const;

function isCmfActionIconSize(size: string): size is CmfActionIconSize {
  return size in MANTINE_SIZE_FALLBACKS;
}

function resolveActionIconSize(size: unknown): string {
  if (typeof size === 'string' && isCmfActionIconSize(size)) {
    return cmfActionIconSizeToken(size, 'size', MANTINE_SIZE_FALLBACKS[size]);
  }

  if (typeof size === 'string') {
    return `var(--ai-size-${size}, var(--ai-size-md))`;
  }

  if (typeof size === 'number') {
    return `calc(${size} / 16 * 1rem * var(--mantine-scale))`;
  }

  return cmfActionIconSizeToken('md', 'size', MANTINE_SIZE_FALLBACKS.md);
}

function isCmfActionIconVariant(variant: string | undefined): variant is CmfActionIconVariant {
  return variant !== undefined && variant in MANTINE_VARIANT_FALLBACKS;
}

function resolveActionIconVariantVars(variant: string | undefined): Record<string, string> {
  const key: CmfActionIconVariant = isCmfActionIconVariant(variant) ? variant : 'default';
  const mantine = MANTINE_VARIANT_FALLBACKS[key];

  return {
    '--ai-bg': cmfActionIconVariantToken(key, 'bg', mantine.bg),
    '--ai-bd': cmfActionIconVariantToken(key, 'bd', mantine.bd),
    '--ai-color': cmfActionIconVariantToken(key, 'color', mantine.color),
    '--ai-hover': cmfActionIconVariantToken(key, 'hover', mantine.hover),
    '--ai-hover-color': cmfActionIconVariantToken(key, 'hover-color', mantine['hover-color']),
    '--ai-disabled-bg': cmfActionIconDisabledToken(key, 'bg', MANTINE_DISABLED_FALLBACKS.bg),
    '--ai-disabled-color': cmfActionIconDisabledToken(
      key,
      'color',
      MANTINE_DISABLED_FALLBACKS.color,
    ),
    '--ai-disabled-hover': cmfActionIconDisabledToken(
      key,
      'hover',
      MANTINE_DISABLED_FALLBACKS.hover,
    ),
    '--ai-disabled-hover-color': cmfActionIconDisabledToken(
      key,
      'hover-color',
      MANTINE_DISABLED_FALLBACKS['hover-color'],
    ),
    '--ai-loading-bg': cmfActionIconLoadingToken(key, 'bg', 'var(--ai-bg)'),
    '--ai-loading-color': cmfActionIconLoadingToken(key, 'color', 'var(--ai-color)'),
    '--ai-loading-bd': cmfActionIconLoadingToken(key, 'bd', 'var(--ai-bd)'),
  };
}

type ActionIconVarsProps = MantineVariantColorProps & {
  size?: unknown;
  radius?: unknown;
};

/** Mantine theme `vars` — merged after varsResolver, overrides Mantine inline styles. */
export function resolveActionIconRootVars(
  theme: MantineTheme,
  props: ActionIconVarsProps,
): Record<string, string> {
  const radius =
    props.radius === undefined
      ? cmfActionIconToken('radius', 'var(--mantine-radius-md)')
      : typeof props.radius === 'number'
        ? `calc(${props.radius} / 16 * 1rem * var(--mantine-scale))`
        : `var(--mantine-radius-${String(props.radius)}, var(--mantine-radius-md))`;

  const base = {
    '--ai-size': resolveActionIconSize(props.size),
    '--ai-radius': radius,
    ...resolveActionIconVariantVars(props.variant),
  };
  const colorVars = resolveMantineVariantColorVars(theme, props, 'ai');

  return colorVars ? { ...base, ...colorVars } : base;
}
