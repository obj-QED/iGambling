import type { MantineTheme } from '@mantine/core';

import {
  type CmfActionIconSize,
  type CmfActionIconVariant,
  type CmfActionIconVariantCoreProp,
} from '../cmf/cmfActionIconVars';
import { buildCmfControlToken, type CmfScope, resolveCmfScope } from '../cmf/cmfCascadeResolve';
import { APP_GRADIENT_DEFAULT, APP_GRADIENT_DEFAULT_HOVER } from '../theme/gradientTokens';
import { resolveMantineComponentRadius } from './mantineRadiusVars';
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
  xs: 'calc(1.875rem * var(--mantine-scale))',
  sm: 'calc(2.25rem * var(--mantine-scale))',
  md: 'calc(2.625rem * var(--mantine-scale))',
  lg: 'calc(3.125rem * var(--mantine-scale))',
  xl: 'calc(3.75rem * var(--mantine-scale))',
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

function isCmfActionIconVariant(variant: string | undefined): variant is CmfActionIconVariant {
  return variant !== undefined && variant in MANTINE_VARIANT_FALLBACKS;
}

function cmfActionIconTokenCascaded(suffix: string, fallback: string, scope?: CmfScope): string {
  return buildCmfControlToken('action-icon', suffix, fallback, scope);
}

function resolveActionIconSize(size: unknown, scope?: CmfScope): string {
  if (typeof size === 'string' && isCmfActionIconSize(size)) {
    return cmfActionIconTokenCascaded(`${size}-size`, MANTINE_SIZE_FALLBACKS[size], scope);
  }

  if (typeof size === 'string') {
    return `var(--ai-size-${size}, var(--ai-size-md))`;
  }

  if (typeof size === 'number') {
    return `calc(${size} / 16 * 1rem * var(--mantine-scale))`;
  }

  return cmfActionIconTokenCascaded('md-size', MANTINE_SIZE_FALLBACKS.md, scope);
}

function cmfActionIconDisabledTokenCascaded(
  variant: CmfActionIconVariant,
  prop: 'bg' | 'color' | 'hover' | 'hover-color',
  scope: CmfScope | undefined,
  fallback: string,
): string {
  const generic = cmfActionIconTokenCascaded(`disabled-${prop}`, fallback, scope);
  return cmfActionIconTokenCascaded(`${variant}-disabled-${prop}`, generic, scope);
}

function cmfActionIconLoadingTokenCascaded(
  variant: CmfActionIconVariant,
  prop: 'bg' | 'color' | 'bd',
  scope: CmfScope | undefined,
  fallback: string,
): string {
  const generic = cmfActionIconTokenCascaded(`loading-${prop}`, fallback, scope);
  return cmfActionIconTokenCascaded(`${variant}-loading-${prop}`, generic, scope);
}

function resolveActionIconVariantVars(
  variant: string | undefined,
  scope?: CmfScope,
): Record<string, string> {
  const key: CmfActionIconVariant = isCmfActionIconVariant(variant) ? variant : 'default';
  const mantine = MANTINE_VARIANT_FALLBACKS[key];

  return {
    '--ai-bg': cmfActionIconTokenCascaded(`${key}-bg`, mantine.bg, scope),
    '--ai-bd': cmfActionIconTokenCascaded(`${key}-bd`, mantine.bd, scope),
    '--ai-color': cmfActionIconTokenCascaded(`${key}-color`, mantine.color, scope),
    '--ai-hover': cmfActionIconTokenCascaded(`${key}-hover`, mantine.hover, scope),
    '--ai-hover-color': cmfActionIconTokenCascaded(
      `${key}-hover-color`,
      mantine['hover-color'],
      scope,
    ),
    '--ai-disabled-bg': cmfActionIconDisabledTokenCascaded(
      key,
      'bg',
      scope,
      MANTINE_DISABLED_FALLBACKS.bg,
    ),
    '--ai-disabled-color': cmfActionIconDisabledTokenCascaded(
      key,
      'color',
      scope,
      MANTINE_DISABLED_FALLBACKS.color,
    ),
    '--ai-disabled-hover': cmfActionIconDisabledTokenCascaded(
      key,
      'hover',
      scope,
      MANTINE_DISABLED_FALLBACKS.hover,
    ),
    '--ai-disabled-hover-color': cmfActionIconDisabledTokenCascaded(
      key,
      'hover-color',
      scope,
      MANTINE_DISABLED_FALLBACKS['hover-color'],
    ),
    '--ai-loading-bg': cmfActionIconLoadingTokenCascaded(key, 'bg', scope, 'var(--ai-bg)'),
    '--ai-loading-color': cmfActionIconLoadingTokenCascaded(key, 'color', scope, 'var(--ai-color)'),
    '--ai-loading-bd': cmfActionIconLoadingTokenCascaded(key, 'bd', scope, 'var(--ai-bd)'),
  };
}

type ActionIconVarsProps = MantineVariantColorProps & {
  size?: unknown;
  radius?: unknown;
  cmfComponent?: string;
  cmfKey?: string;
  'data-cmf-component'?: string;
  'data-cmf-key'?: string;
  'data-menu-key'?: string;
};

/** Mantine theme `vars` — merged after varsResolver, overrides Mantine inline styles. */
export function resolveActionIconRootVars(
  theme: MantineTheme,
  props: ActionIconVarsProps,
): Record<string, string> {
  const scope = resolveCmfScope(props as Record<string, unknown>);
  const radius = resolveMantineComponentRadius(
    props.radius,
    cmfActionIconTokenCascaded('radius', 'var(--mantine-radius-md)', scope),
  );

  const base = {
    '--ai-size': resolveActionIconSize(props.size, scope),
    '--ai-radius': radius,
    ...resolveActionIconVariantVars(props.variant, scope),
  };
  const colorVars = resolveMantineVariantColorVars(theme, props, 'ai');

  return colorVars ? { ...base, ...colorVars } : base;
}
