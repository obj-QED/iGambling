import { DEFAULT_THEME, type MantineGradient, type MantineTheme } from '@mantine/core';

export type MantineVariantColorProps = {
  color?: string;
  variant?: string;
  gradient?: MantineGradient;
  autoContrast?: boolean;
};

const MANTINE_COLOR_AWARE_VARIANTS = new Set([
  'filled',
  'outline',
  'light',
  'subtle',
  'default',
  'transparent',
  'white',
  'gradient',
]);

type CmfColorPrefix = 'button' | 'ai';

/** Mantine variantColorResolver output mapped to CMF --button-* / --ai-* vars. */
export function resolveMantineVariantColorVars(
  theme: MantineTheme,
  props: MantineVariantColorProps,
  prefix: CmfColorPrefix,
): Record<string, string> | null {
  if (!props.color) {
    return null;
  }

  const variant = props.variant ?? 'filled';
  if (!MANTINE_COLOR_AWARE_VARIANTS.has(variant)) {
    return null;
  }

  const resolver = theme.variantColorResolver ?? DEFAULT_THEME.variantColorResolver;
  const colors = resolver({
    color: props.color,
    theme,
    gradient: props.gradient,
    variant,
    autoContrast: props.autoContrast ?? true,
  });

  const bg = colors.background ?? '';
  const hover = colors.hover ?? '';
  const color = colors.color ?? '';
  const border = colors.border ?? '';
  const hoverColor = colors.hoverColor ?? '';

  const token = prefix === 'button' ? 'button' : 'ai';

  return {
    [`--${token}-bg`]: bg,
    [`--${token}-hover`]: hover,
    [`--${token}-color`]: color,
    [`--${token}-bd`]: border,
    [`--${token}-hover-color`]: hoverColor,
    [`--${token}-loading-bg`]: bg,
    [`--${token}-loading-color`]: color,
    [`--${token}-loading-bd`]: border,
  };
}
