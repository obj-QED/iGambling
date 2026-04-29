import {
  createTheme,
  defaultVariantColorsResolver,
  rem,
  type VariantColorsResolver,
} from '@mantine/core';

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
    xs: rem(480),
    sm: rem(768),
    md: rem(1024),
    lg: rem(1280),
    xl: rem(1536),
  },
  fontFamily: 'var(--root-font-family, IBM Plex Sans, sans-serif)',
  variantColorResolver,
  components: {
    Button: {
      styles: {
        root: {
          '&:focus, &:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
