import {
  createTheme,
  defaultVariantColorsResolver,
  Title,
  type VariantColorsResolver,
} from '@mantine/core';

import classes from './mantineTheme.module.scss';

const pxToEm = (px: number): string => `${px / 16}em`;
const APP_SIZE_MOBILE_MAX_PX = 992;

export const appBreakpointPx = {
  xs: 0,
  sm: 768,
  md: 993,
  lg: 1240,
  xl: 1920,
} as const;

export const appSize = {
  mobile: {
    min: appBreakpointPx.xs,
    max: APP_SIZE_MOBILE_MAX_PX,
    media: `(max-width: ${pxToEm(APP_SIZE_MOBILE_MAX_PX)})`,
  },
} as const;

const variantColorResolver: VariantColorsResolver = (input) => {
  const resolved = defaultVariantColorsResolver(input);

  if (input.variant !== 'default') {
    return resolved;
  }

  return {
    ...resolved,
    background: `var(--demo_btn_default-bg, ${resolved.background})`,
    hover: `var(--demo_btn_default-hover, ${resolved.hover})`,
    border: `var(--demo_btn_default-border, ${resolved.border})`,
    color: `var(--demo_btn_default-color, ${resolved.color})`,
  };
};

/**
 * Shared Mantine theme used by local UI scopes (for example header buttons).
 */
export const mantineTheme = createTheme({
  focusRing: 'never',
  breakpoints: {
    xs: pxToEm(appBreakpointPx.xs),
    sm: pxToEm(appBreakpointPx.sm),
    md: pxToEm(appBreakpointPx.md),
    lg: pxToEm(appBreakpointPx.lg),
    xl: pxToEm(appBreakpointPx.xl),
  },
  fontFamily: 'var(--root-font-family, IBM Plex Sans, sans-serif)',
  other: {
    size: appSize,
  },
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
  variantColorResolver,
});
