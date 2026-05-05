import type { CSSProperties } from 'react';

import { btnCssPrefix } from './Button.vars';

const DEFAULT_SIZE = 'sm';

export const createButtonVars = (varsKey: string): CSSProperties => {
  const p = btnCssPrefix(varsKey);

  return {
    '--button-bg': `var(--${p}-bg, transparent)`,
    '--button-color': `var(--${p}-color, #fff)`,
    '--button-bd': `var(--${p}-border, none)`,
    '--button-radius': `var(--${p}-radius, 10px)`,
    '--button-fz': `var(--${p}-fz, 14px)`,
    '--button-padding-x': `var(--${p}-padding-x, 12px)`,
    '--button-hover': `var(--${p}-hover, transparent)`,
    '--button-hover-color': `var(--${p}-hover-color, var(--${p}-color, rgb(255 255 255 / 75%)))`,
    '--button-active-bg': `var(--${p}-active-bg, gray)`,
    '--button-active-color': `var(--${p}-active-color, white)`,
    '--button-active-border': `var(--${p}-active-border, var(--${p}-border, none))`,
    '--button-disabled-bg': `var(--${p}-disabled-bg, gray)`,
    '--button-disabled-color': `var(--${p}-disabled-color, #9ca3af)`,
    '--button-disabled-border': `var(--${p}-disabled-border, gray)`,
    '--mantine-spacing-xs': `var(--${p}-spacing-${DEFAULT_SIZE}, 6px)`,
    '--mantine-font-weight-medium': `var(--${p}-font-weight, 500)`,
    /**
     * Mantine does not read `--button-size`: height/padding/font-size come from the `size` prop in JS.
     * This line keeps the cascade; real sizing reads `--${p}-size` from `:root` into the `size` prop.
     */
    '--button-size': `var(--${p}-size, ${DEFAULT_SIZE})`,

    borderRadius: `var(--button-radius)`,
    backgroundColor: `var(--button-bg)`,
  } as CSSProperties;
};
