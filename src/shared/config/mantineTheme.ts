import {
  Container,
  createTheme,
  defaultVariantColorsResolver,
  rem,
  Title,
  type VariantColorsResolver,
  virtualColor,
} from '@mantine/core';

import { appBreakpointPx, appSizePx, containerSizeByBreakpointPx } from './styleTokens';

import classes from './mantineTheme.module.scss';

const pxToEm = (px: number): string => `${px / 16}em`;

export const appSize = {
  mobile: {
    min: appSizePx.mobile.min,
    max: appSizePx.mobile.max,
    media: `(max-width: ${pxToEm(appSizePx.mobile.max)})`,
  },
} as const;

const CONTAINER_SIZE_BY_BREAKPOINT = {
  xs: rem(containerSizeByBreakpointPx.xs),
  sm: rem(containerSizeByBreakpointPx.sm),
  md: rem(containerSizeByBreakpointPx.md),
  lg: rem(containerSizeByBreakpointPx.lg),
  xl: rem(containerSizeByBreakpointPx.xl),
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
    // mantineTheme.ts
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: size === 'responsive' ? classes.responsiveContainer : undefined,
      }),
      defaultProps: {
        size: 'responsive',
      },
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size-xs': CONTAINER_SIZE_BY_BREAKPOINT.xs,
          '--container-size-sm': CONTAINER_SIZE_BY_BREAKPOINT.sm,
          '--container-size-md': CONTAINER_SIZE_BY_BREAKPOINT.md,
          '--container-size-lg': CONTAINER_SIZE_BY_BREAKPOINT.lg,
          '--container-size-xl': CONTAINER_SIZE_BY_BREAKPOINT.xl,
          '--container-size': fluid
            ? '100%'
            : typeof size === 'string' &&
                size !== 'responsive' &&
                size in CONTAINER_SIZE_BY_BREAKPOINT
              ? CONTAINER_SIZE_BY_BREAKPOINT[size as keyof typeof CONTAINER_SIZE_BY_BREAKPOINT]
              : undefined,
        },
      }),
    }),
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
  variantColorResolver,
});
