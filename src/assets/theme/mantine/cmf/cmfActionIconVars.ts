/** Mantine `--ai-*` tokens bridged through optional CMF overrides from theme.scss. */
export const CMF_ACTION_ICON_STYLE_PROPS = [
  'bg',
  'bd',
  'color',
  'hover',
  'hover-color',
  'radius',
  'size',
] as const;

export const CMF_ACTION_ICON_VARIANTS = [
  'filled',
  'outline',
  'light',
  'subtle',
  'default',
  'transparent',
  'white',
  'gradient',
  'hero',
  'hero-light',
  'hero-outline',
] as const;

export const CMF_ACTION_ICON_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'input-xs',
  'input-sm',
  'input-md',
  'input-lg',
  'input-xl',
] as const;

export type CmfActionIconStyleProp = (typeof CMF_ACTION_ICON_STYLE_PROPS)[number];
export type CmfActionIconVariant = (typeof CMF_ACTION_ICON_VARIANTS)[number];
export type CmfActionIconSize = (typeof CMF_ACTION_ICON_SIZES)[number];

export const CMF_ACTION_ICON_DISABLED_PROPS = [
  'disabled-bg',
  'disabled-color',
  'disabled-hover',
  'disabled-hover-color',
] as const;

export const CMF_ACTION_ICON_LOADING_PROPS = ['loading-bg', 'loading-color', 'loading-bd'] as const;

export type CmfActionIconVariantCoreProp = 'bg' | 'bd' | 'color' | 'hover' | 'hover-color';
export type CmfActionIconDisabledProp = (typeof CMF_ACTION_ICON_DISABLED_PROPS)[number];
export type CmfActionIconLoadingProp = (typeof CMF_ACTION_ICON_LOADING_PROPS)[number];
export type CmfActionIconVariantStyleProp =
  | CmfActionIconVariantCoreProp
  | CmfActionIconDisabledProp
  | CmfActionIconLoadingProp;
export type CmfActionIconSizeStyleProp = 'size';

export function cmfActionIconVar(prop: CmfActionIconStyleProp): string {
  return `--cmf-action-icon-${prop}`;
}

export function cmfActionIconVariantVar(
  variant: CmfActionIconVariant,
  prop: CmfActionIconVariantStyleProp,
): string {
  return `--cmf-action-icon-${variant}-${prop}`;
}

export function cmfScopedActionIconVariantVar(
  scopeKey: string,
  variant: CmfActionIconVariant,
  prop: CmfActionIconVariantStyleProp,
): string {
  return `--cmf-${scopeKey}-action-icon-${variant}-${prop}`;
}

export function cmfActionIconToken(prop: CmfActionIconStyleProp, fallback?: string): string {
  return fallback !== undefined
    ? `var(${cmfActionIconVar(prop)}, ${fallback})`
    : `var(${cmfActionIconVar(prop)})`;
}

export function cmfActionIconVariantToken(
  variant: CmfActionIconVariant,
  prop: CmfActionIconVariantStyleProp,
  fallback?: string,
): string {
  const token = cmfActionIconVariantVar(variant, prop);

  return fallback !== undefined ? `var(${token}, ${fallback})` : `var(${token})`;
}

export function cmfActionIconDisabledToken(
  variant: CmfActionIconVariant,
  prop: 'bg' | 'color' | 'hover' | 'hover-color',
  fallback?: string,
): string {
  const variantToken = `--cmf-action-icon-${variant}-disabled-${prop}`;
  const genericToken = `--cmf-action-icon-disabled-${prop}`;
  const generic =
    fallback !== undefined ? `var(${genericToken}, ${fallback})` : `var(${genericToken})`;

  return `var(${variantToken}, ${generic})`;
}

export function cmfActionIconLoadingToken(
  variant: CmfActionIconVariant,
  prop: 'bg' | 'color' | 'bd',
  fallback: string,
): string {
  const variantToken = `--cmf-action-icon-${variant}-loading-${prop}`;
  const genericToken = `--cmf-action-icon-loading-${prop}`;

  return `var(${variantToken}, var(${genericToken}, ${fallback}))`;
}

export function cmfActionIconSizeVar(
  size: CmfActionIconSize,
  prop: CmfActionIconSizeStyleProp,
): string {
  return `--cmf-action-icon-${size}-${prop}`;
}

export function cmfActionIconSizeToken(
  size: CmfActionIconSize,
  prop: CmfActionIconSizeStyleProp,
  fallback?: string,
): string {
  const token = cmfActionIconSizeVar(size, prop);

  return fallback !== undefined ? `var(${token}, ${fallback})` : `var(${token})`;
}
