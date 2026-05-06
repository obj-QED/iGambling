import scssTokensRaw from '@/assets/styles/_tokens.scss?raw';

const parseTokenPx = (tokenName: string): number => {
  const tokenPattern = new RegExp(`\\$${tokenName}:\\s*([\\d.]+)px;`);
  const tokenMatch = scssTokensRaw.match(tokenPattern);

  if (!tokenMatch?.[1]) {
    throw new Error(`SCSS token "${tokenName}" is missing in _tokens.scss`);
  }

  return Number(tokenMatch[1]);
};

const parseTokenRawValue = (tokenName: string): string => {
  const tokenPattern = new RegExp(`\\$${tokenName}:\\s*([^;]+);`);
  const tokenMatch = scssTokensRaw.match(tokenPattern);

  if (!tokenMatch?.[1]) {
    throw new Error(`SCSS token "${tokenName}" is missing in _tokens.scss`);
  }

  return tokenMatch[1].trim();
};

export const appTokensPx = {
  breakpointXs: parseTokenPx('breakpoint-xs'),
  breakpointSm: parseTokenPx('breakpoint-sm'),
  breakpointMd: parseTokenPx('breakpoint-md'),
  breakpointLg: parseTokenPx('breakpoint-lg'),
  breakpointXl: parseTokenPx('breakpoint-xl'),
  containerSizeMobile: parseTokenRawValue('container-size-mobile'),
  containerSizeTablet: parseTokenPx('container-size-tablet'),
  containerSizeLaptop: parseTokenPx('container-size-laptop'),
  containerSizeDesktop: parseTokenPx('container-size-desktop'),
  containerPaddingDesktop: parseTokenRawValue('container-padding-desktop'),
  containerPaddingMobile: parseTokenRawValue('container-padding-mobile'),
} as const;

export const appBreakpointPx = {
  xs: 0,
  sm: Math.floor(appTokensPx.breakpointXs) + 1,
  md: Math.floor(appTokensPx.breakpointSm) + 1,
  lg: appTokensPx.breakpointMd,
  xl: appTokensPx.breakpointLg,
} as const;

export const appSizePx = {
  mobile: {
    min: appBreakpointPx.xs,
    max: appTokensPx.breakpointSm,
  },
} as const;

export const containerSizeByBreakpointPx = {
  xs: appBreakpointPx.xs,
  sm: appBreakpointPx.sm,
  md: appBreakpointPx.md,
  lg: appBreakpointPx.lg,
  xl: appBreakpointPx.xl,
} as const;

