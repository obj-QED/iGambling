/** Mantine `--button-*` tokens bridged through optional CMF overrides from theme.scss. */
export const CMF_BUTTON_STYLE_PROPS = [
  'bg',
  'bd',
  'color',
  'hover',
  'hover-color',
  'radius',
  'height',
  'padding-x',
  'fz',
  'justify',
] as const;

export const CMF_BUTTON_VARIANTS = [
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

export const CMF_BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type CmfButtonStyleProp = (typeof CMF_BUTTON_STYLE_PROPS)[number];
export type CmfButtonVariant = (typeof CMF_BUTTON_VARIANTS)[number];
export type CmfButtonSize = (typeof CMF_BUTTON_SIZES)[number];

export const CMF_BUTTON_DISABLED_PROPS = [
  'disabled-bg',
  'disabled-color',
  'disabled-hover',
  'disabled-hover-color',
] as const;

export const CMF_BUTTON_LOADING_PROPS = ['loading-bg', 'loading-color', 'loading-bd'] as const;

export type CmfButtonVariantCoreProp = 'bg' | 'bd' | 'color' | 'hover' | 'hover-color';
export type CmfButtonDisabledProp = (typeof CMF_BUTTON_DISABLED_PROPS)[number];
export type CmfButtonLoadingProp = (typeof CMF_BUTTON_LOADING_PROPS)[number];
export type CmfButtonVariantStyleProp =
  | CmfButtonVariantCoreProp
  | CmfButtonDisabledProp
  | CmfButtonLoadingProp;
export type CmfButtonSizeStyleProp = 'height' | 'padding-x' | 'fz';

/** Shared (size/layout): `--cmf-button-radius` */
export function cmfButtonVar(prop: CmfButtonStyleProp): string {
  return `--cmf-button-${prop}`;
}

/** Per variant: `--cmf-button-filled-bg` */
export function cmfButtonVariantVar(
  variant: CmfButtonVariant,
  prop: CmfButtonVariantStyleProp,
): string {
  return `--cmf-button-${variant}-${prop}`;
}

/** Location per variant: `--cmf-hero-button-filled-bg` */
export function cmfScopedButtonVariantVar(
  scopeKey: string,
  variant: CmfButtonVariant,
  prop: CmfButtonVariantStyleProp,
): string {
  return `--cmf-${scopeKey}-button-${variant}-${prop}`;
}

export function cmfButtonToken(prop: CmfButtonStyleProp, fallback?: string): string {
  return fallback !== undefined
    ? `var(${cmfButtonVar(prop)}, ${fallback})`
    : `var(${cmfButtonVar(prop)})`;
}

export function cmfButtonVariantToken(
  variant: CmfButtonVariant,
  prop: CmfButtonVariantStyleProp,
  fallback?: string,
): string {
  const token = cmfButtonVariantVar(variant, prop);

  return fallback !== undefined ? `var(${token}, ${fallback})` : `var(${token})`;
}

/** Per-variant disabled with generic `--cmf-button-disabled-*` fallback. */
export function cmfButtonDisabledToken(
  variant: CmfButtonVariant,
  prop: 'bg' | 'color' | 'hover' | 'hover-color',
  fallback?: string,
): string {
  const variantToken = `--cmf-button-${variant}-disabled-${prop}`;
  const genericToken = `--cmf-button-disabled-${prop}`;
  const generic =
    fallback !== undefined ? `var(${genericToken}, ${fallback})` : `var(${genericToken})`;

  return `var(${variantToken}, ${generic})`;
}

/** Per-variant loading with generic `--cmf-button-loading-*` fallback. */
export function cmfButtonLoadingToken(
  variant: CmfButtonVariant,
  prop: 'bg' | 'color' | 'bd',
  fallback: string,
): string {
  const variantToken = `--cmf-button-${variant}-loading-${prop}`;
  const genericToken = `--cmf-button-loading-${prop}`;

  return `var(${variantToken}, var(${genericToken}, ${fallback}))`;
}

/** Per size: `--cmf-button-md-height` */
export function cmfButtonSizeVar(size: CmfButtonSize, prop: CmfButtonSizeStyleProp): string {
  return `--cmf-button-${size}-${prop}`;
}

export function cmfButtonSizeToken(
  size: CmfButtonSize,
  prop: CmfButtonSizeStyleProp,
  fallback?: string,
): string {
  const token = cmfButtonSizeVar(size, prop);

  return fallback !== undefined ? `var(${token}, ${fallback})` : `var(${token})`;
}
