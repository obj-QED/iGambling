import type { MantineTheme } from '@mantine/core';
import type { CSSProperties } from 'react';

import {
  cmfButtonDisabledToken,
  cmfButtonLoadingToken,
  type CmfButtonSize,
  cmfButtonSizeToken,
  cmfButtonToken,
  type CmfButtonVariant,
  type CmfButtonVariantCoreProp,
  cmfButtonVariantToken,
} from './cmfButtonVars';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from './gradientTokens';
import {
  type MantineVariantColorProps,
  resolveMantineVariantColorVars,
} from './mantineVariantColorVars';

const MANTINE_BUTTON_BORDER = 'calc(0.0625rem * var(--mantine-scale)) solid var(--color-border)';
const MANTINE_BUTTON_BORDER_TRANSPARENT =
  'calc(0.0625rem * var(--mantine-scale)) solid transparent';

/** Last-resort fallbacks when CMF tokens are unset (Mantine palette / scale). */
const MANTINE_VARIANT_FALLBACKS: Record<
  CmfButtonVariant,
  Record<CmfButtonVariantCoreProp, string>
> = {
  filled: {
    bg: 'var(--mantine-color-brand-4)',
    hover: 'var(--mantine-color-brand-3)',
    color: 'var(--mantine-primary-color-contrast)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
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
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-brand-light-color)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  subtle: {
    bg: 'transparent',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-dimmed)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  default: {
    bg: 'var(--mantine-color-default)',
    bd: MANTINE_BUTTON_BORDER,
    color: 'var(--mantine-color-text)',
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  transparent: {
    bg: 'transparent',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-text)',
    hover: 'transparent',
    'hover-color': 'var(--mantine-color-text)',
  },
  white: {
    bg: 'var(--mantine-color-white)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-black)',
    hover: 'var(--mantine-color-white)',
    'hover-color': 'var(--mantine-color-black)',
  },
  gradient: {
    bg: 'var(--app-gradient-default, ' + APP_GRADIENT_DEFAULT + ')',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-primary-color-contrast)',
    hover: 'var(--app-gradient-default-hover, ' + APP_GRADIENT_DEFAULT_HOVER + ')',
    'hover-color': 'var(--mantine-primary-color-contrast)',
  },
  hero: {
    bg: 'var(--mantine-color-default)',
    bd: MANTINE_BUTTON_BORDER,
    color: 'var(--mantine-color-text)',
    hover: 'var(--mantine-color-default-hover)',
    'hover-color': 'var(--mantine-color-text)',
  },
  'hero-light': {
    bg: 'var(--mantine-color-brand-light)',
    bd: MANTINE_BUTTON_BORDER_TRANSPARENT,
    color: 'var(--mantine-color-brand-light-color)',
    hover: 'var(--mantine-color-brand-light-hover)',
    'hover-color': 'var(--mantine-color-brand-light-color)',
  },
  'hero-outline': {
    bg: 'transparent',
    bd: MANTINE_BUTTON_BORDER,
    color: 'var(--mantine-color-text)',
    hover: 'color-mix(in srgb, var(--mantine-color-brand-4) 8%, transparent)',
    'hover-color': 'var(--mantine-color-text)',
  },
};

const MANTINE_SIZE_FALLBACKS: Record<
  CmfButtonSize,
  { height: string; 'padding-x': string; fz: string }
> = {
  xs: {
    height: 'calc(1.875rem * var(--mantine-scale))',
    'padding-x': 'var(--mantine-spacing-sm)',
    fz: 'var(--mantine-font-size-xs)',
  },
  sm: {
    height: 'calc(2.25rem * var(--mantine-scale))',
    'padding-x': 'var(--mantine-spacing-sm)',
    fz: 'var(--mantine-font-size-sm)',
  },
  md: {
    height: 'calc(2.625rem * var(--mantine-scale))',
    'padding-x': 'var(--mantine-spacing-md)',
    fz: 'var(--mantine-font-size-sm)',
  },
  lg: {
    height: 'calc(3.125rem * var(--mantine-scale))',
    'padding-x': 'var(--mantine-spacing-md)',
    fz: 'var(--mantine-font-size-md)',
  },
  xl: {
    height: 'calc(3.75rem * var(--mantine-scale))',
    'padding-x': 'var(--mantine-spacing-lg)',
    fz: 'var(--mantine-font-size-lg)',
  },
};

const BUTTON_SIZE_VARS: Record<CmfButtonSize, Record<string, string>> = {
  xs: {
    '--button-height': cmfButtonSizeToken('xs', 'height', MANTINE_SIZE_FALLBACKS.xs.height),
    '--button-padding-x': cmfButtonSizeToken(
      'xs',
      'padding-x',
      MANTINE_SIZE_FALLBACKS.xs['padding-x'],
    ),
    '--button-fz': cmfButtonSizeToken('xs', 'fz', MANTINE_SIZE_FALLBACKS.xs.fz),
  },
  sm: {
    '--button-height': cmfButtonSizeToken('sm', 'height', MANTINE_SIZE_FALLBACKS.sm.height),
    '--button-padding-x': cmfButtonSizeToken(
      'sm',
      'padding-x',
      MANTINE_SIZE_FALLBACKS.sm['padding-x'],
    ),
    '--button-fz': cmfButtonSizeToken('sm', 'fz', MANTINE_SIZE_FALLBACKS.sm.fz),
  },
  md: {
    '--button-height': cmfButtonSizeToken('md', 'height', MANTINE_SIZE_FALLBACKS.md.height),
    '--button-padding-x': cmfButtonSizeToken(
      'md',
      'padding-x',
      MANTINE_SIZE_FALLBACKS.md['padding-x'],
    ),
    '--button-fz': cmfButtonSizeToken('md', 'fz', MANTINE_SIZE_FALLBACKS.md.fz),
  },
  lg: {
    '--button-height': cmfButtonSizeToken('lg', 'height', MANTINE_SIZE_FALLBACKS.lg.height),
    '--button-padding-x': cmfButtonSizeToken(
      'lg',
      'padding-x',
      MANTINE_SIZE_FALLBACKS.lg['padding-x'],
    ),
    '--button-fz': cmfButtonSizeToken('lg', 'fz', MANTINE_SIZE_FALLBACKS.lg.fz),
  },
  xl: {
    '--button-height': cmfButtonSizeToken('xl', 'height', MANTINE_SIZE_FALLBACKS.xl.height),
    '--button-padding-x': cmfButtonSizeToken(
      'xl',
      'padding-x',
      MANTINE_SIZE_FALLBACKS.xl['padding-x'],
    ),
    '--button-fz': cmfButtonSizeToken('xl', 'fz', MANTINE_SIZE_FALLBACKS.xl.fz),
  },
};

function resolveButtonSize(size: unknown): CmfButtonSize {
  if (typeof size === 'string' && size in BUTTON_SIZE_VARS) {
    return size as CmfButtonSize;
  }

  return 'md';
}

const MANTINE_DISABLED_FALLBACKS = {
  bg: 'var(--mantine-color-disabled)',
  color: 'var(--mantine-color-disabled-color)',
  hover: 'var(--mantine-color-disabled)',
  'hover-color': 'var(--mantine-color-disabled-color)',
} as const;

function isCmfButtonVariant(variant: string | undefined): variant is CmfButtonVariant {
  return variant !== undefined && variant in MANTINE_VARIANT_FALLBACKS;
}

function resolveButtonVariantVars(variant: string | undefined): Record<string, string> {
  const key: CmfButtonVariant = isCmfButtonVariant(variant) ? variant : 'default';
  const mantine = MANTINE_VARIANT_FALLBACKS[key];

  return {
    '--button-bg': cmfButtonVariantToken(key, 'bg', mantine.bg),
    '--button-bd': cmfButtonVariantToken(key, 'bd', mantine.bd),
    '--button-color': cmfButtonVariantToken(key, 'color', mantine.color),
    '--button-hover': cmfButtonVariantToken(key, 'hover', mantine.hover),
    '--button-hover-color': cmfButtonVariantToken(key, 'hover-color', mantine['hover-color']),
    '--button-disabled-bg': cmfButtonDisabledToken(key, 'bg', MANTINE_DISABLED_FALLBACKS.bg),
    '--button-disabled-color': cmfButtonDisabledToken(
      key,
      'color',
      MANTINE_DISABLED_FALLBACKS.color,
    ),
    '--button-disabled-hover': cmfButtonDisabledToken(
      key,
      'hover',
      MANTINE_DISABLED_FALLBACKS.hover,
    ),
    '--button-disabled-hover-color': cmfButtonDisabledToken(
      key,
      'hover-color',
      MANTINE_DISABLED_FALLBACKS['hover-color'],
    ),
    '--button-loading-bg': cmfButtonLoadingToken(key, 'bg', 'var(--button-bg)'),
    '--button-loading-color': cmfButtonLoadingToken(key, 'color', 'var(--button-color)'),
    '--button-loading-bd': cmfButtonLoadingToken(key, 'bd', 'var(--button-bd)'),
  };
}

type ButtonVarsProps = MantineVariantColorProps & {
  size?: unknown;
  justify?: CSSProperties['justifyContent'];
};

/** Mantine theme `vars` — merged after varsResolver, overrides --mantine-* inline styles. */
export function resolveButtonRootVars(
  theme: MantineTheme,
  props: ButtonVarsProps,
): Record<string, string> {
  const size = resolveButtonSize(props.size);
  const base = {
    ...BUTTON_SIZE_VARS[size],
    '--button-radius': cmfButtonToken('radius', 'var(--mantine-radius-md)'),
    '--button-justify': cmfButtonToken('justify', String(props.justify ?? 'center')),
    ...resolveButtonVariantVars(props.variant),
  };
  const colorVars = resolveMantineVariantColorVars(theme, props, 'button');

  return colorVars ? { ...base, ...colorVars } : base;
}
