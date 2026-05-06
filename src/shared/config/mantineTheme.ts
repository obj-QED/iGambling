import {
  createTheme,
  defaultVariantColorsResolver,
  Title,
  type VariantColorsResolver,
  virtualColor,
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
    background: `var(--mantine-app-btn-default-bg, ${resolved.background})`,
    hover: `var(--mantine-app-btn-default-hover, ${resolved.hover})`,
    border: `var(--mantine-app-btn-default-border, ${resolved.border})`,
    color: `var(--mantine-app-btn-default-color, ${resolved.color})`,
  };
};

/**
 * Shared Mantine theme used by local UI scopes (for example header buttons).
 */
export const mantineTheme = createTheme({
  focusRing: 'never',
  /** Cyan accent in dark mode; neutral `dark` scale in light mode for contrast on white. */
  colors: {
    brand: virtualColor({
      name: 'brand',
      dark: 'cyan',
      light: 'teal',
    }),
  },
  primaryColor: 'brand',
  primaryShade: { light: 7, dark: 6 },
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
