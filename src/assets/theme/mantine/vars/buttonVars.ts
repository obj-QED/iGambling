import type { MantineTheme } from '@mantine/core';
import type { CSSProperties } from 'react';

import {
  CMF_BUTTON_SIZES,
  type CmfButtonSize,
  type CmfButtonVariant,
  type CmfButtonVariantCoreProp,
} from '../cmf/cmfButtonVars';
import { buildCmfControlToken, type CmfScope, resolveCmfScope } from '../cmf/cmfCascadeResolve';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';
import { resolveMantineComponentRadius } from './mantineRadiusVars';
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

function buildButtonSizeVars(scope?: CmfScope): Record<CmfButtonSize, Record<string, string>> {
  return {
    xs: {
      '--button-height': cmfButtonTokenCascaded(
        'xs-height',
        MANTINE_SIZE_FALLBACKS.xs.height,
        scope,
      ),
      '--button-padding-x': cmfButtonTokenCascaded(
        'xs-padding-x',
        MANTINE_SIZE_FALLBACKS.xs['padding-x'],
        scope,
      ),
      '--button-fz': cmfButtonTokenCascaded('xs-fz', MANTINE_SIZE_FALLBACKS.xs.fz, scope),
    },
    sm: {
      '--button-height': cmfButtonTokenCascaded(
        'sm-height',
        MANTINE_SIZE_FALLBACKS.sm.height,
        scope,
      ),
      '--button-padding-x': cmfButtonTokenCascaded(
        'sm-padding-x',
        MANTINE_SIZE_FALLBACKS.sm['padding-x'],
        scope,
      ),
      '--button-fz': cmfButtonTokenCascaded('sm-fz', MANTINE_SIZE_FALLBACKS.sm.fz, scope),
    },
    md: {
      '--button-height': cmfButtonTokenCascaded(
        'md-height',
        MANTINE_SIZE_FALLBACKS.md.height,
        scope,
      ),
      '--button-padding-x': cmfButtonTokenCascaded(
        'md-padding-x',
        MANTINE_SIZE_FALLBACKS.md['padding-x'],
        scope,
      ),
      '--button-fz': cmfButtonTokenCascaded('md-fz', MANTINE_SIZE_FALLBACKS.md.fz, scope),
    },
    lg: {
      '--button-height': cmfButtonTokenCascaded(
        'lg-height',
        MANTINE_SIZE_FALLBACKS.lg.height,
        scope,
      ),
      '--button-padding-x': cmfButtonTokenCascaded(
        'lg-padding-x',
        MANTINE_SIZE_FALLBACKS.lg['padding-x'],
        scope,
      ),
      '--button-fz': cmfButtonTokenCascaded('lg-fz', MANTINE_SIZE_FALLBACKS.lg.fz, scope),
    },
    xl: {
      '--button-height': cmfButtonTokenCascaded(
        'xl-height',
        MANTINE_SIZE_FALLBACKS.xl.height,
        scope,
      ),
      '--button-padding-x': cmfButtonTokenCascaded(
        'xl-padding-x',
        MANTINE_SIZE_FALLBACKS.xl['padding-x'],
        scope,
      ),
      '--button-fz': cmfButtonTokenCascaded('xl-fz', MANTINE_SIZE_FALLBACKS.xl.fz, scope),
    },
  };
}

function cmfButtonTokenCascaded(suffix: string, fallback: string, scope?: CmfScope): string {
  return buildCmfControlToken('button', suffix, fallback, scope);
}

function resolveButtonSize(size: unknown): CmfButtonSize {
  if (typeof size === 'string' && (CMF_BUTTON_SIZES as readonly string[]).includes(size)) {
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

function cmfButtonDisabledTokenCascaded(
  variant: CmfButtonVariant,
  prop: 'bg' | 'color' | 'hover' | 'hover-color',
  scope: CmfScope | undefined,
  fallback: string,
): string {
  const generic = cmfButtonTokenCascaded(`disabled-${prop}`, fallback, scope);
  return cmfButtonTokenCascaded(`${variant}-disabled-${prop}`, generic, scope);
}

function cmfButtonLoadingTokenCascaded(
  variant: CmfButtonVariant,
  prop: 'bg' | 'color' | 'bd',
  scope: CmfScope | undefined,
  fallback: string,
): string {
  const generic = cmfButtonTokenCascaded(`loading-${prop}`, fallback, scope);
  return cmfButtonTokenCascaded(`${variant}-loading-${prop}`, generic, scope);
}

function resolveButtonVariantVars(
  variant: string | undefined,
  scope?: CmfScope,
): Record<string, string> {
  const key: CmfButtonVariant = isCmfButtonVariant(variant) ? variant : 'default';
  const mantine = MANTINE_VARIANT_FALLBACKS[key];

  return {
    '--button-bg': cmfButtonTokenCascaded(`${key}-bg`, mantine.bg, scope),
    '--button-bd': cmfButtonTokenCascaded(`${key}-bd`, mantine.bd, scope),
    '--button-color': cmfButtonTokenCascaded(`${key}-color`, mantine.color, scope),
    '--button-hover': cmfButtonTokenCascaded(`${key}-hover`, mantine.hover, scope),
    '--button-hover-color': cmfButtonTokenCascaded(
      `${key}-hover-color`,
      mantine['hover-color'],
      scope,
    ),
    '--button-disabled-bg': cmfButtonDisabledTokenCascaded(
      key,
      'bg',
      scope,
      MANTINE_DISABLED_FALLBACKS.bg,
    ),
    '--button-disabled-color': cmfButtonDisabledTokenCascaded(
      key,
      'color',
      scope,
      MANTINE_DISABLED_FALLBACKS.color,
    ),
    '--button-disabled-hover': cmfButtonDisabledTokenCascaded(
      key,
      'hover',
      scope,
      MANTINE_DISABLED_FALLBACKS.hover,
    ),
    '--button-disabled-hover-color': cmfButtonDisabledTokenCascaded(
      key,
      'hover-color',
      scope,
      MANTINE_DISABLED_FALLBACKS['hover-color'],
    ),
    '--button-loading-bg': cmfButtonLoadingTokenCascaded(key, 'bg', scope, 'var(--button-bg)'),
    '--button-loading-color': cmfButtonLoadingTokenCascaded(
      key,
      'color',
      scope,
      'var(--button-color)',
    ),
    '--button-loading-bd': cmfButtonLoadingTokenCascaded(key, 'bd', scope, 'var(--button-bd)'),
  };
}

type ButtonVarsProps = MantineVariantColorProps & {
  size?: unknown;
  radius?: unknown;
  justify?: CSSProperties['justifyContent'];
  cmfComponent?: string;
  cmfKey?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-menu-key'?: string;
};

/** Mantine theme `vars` — merged after varsResolver, overrides --mantine-* inline styles. */
export function resolveButtonRootVars(
  theme: MantineTheme,
  props: ButtonVarsProps,
): Record<string, string> {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  const size = resolveButtonSize(props.size);
  const sizeVars = buildButtonSizeVars(scope);
  const base = {
    ...sizeVars[size],
    '--button-radius': resolveMantineComponentRadius(
      props.radius,
      cmfButtonTokenCascaded('radius', 'var(--mantine-radius-md)', scope),
    ),
    '--button-justify': cmfButtonTokenCascaded(
      'justify',
      String(props.justify ?? 'flex-start'),
      scope,
    ),
    ...resolveButtonVariantVars(props.variant, scope),
  };
  const colorVars = resolveMantineVariantColorVars(theme, props, 'button');

  return colorVars ? { ...base, ...colorVars } : base;
}
