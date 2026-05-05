import type { CSSProperties } from 'react';

import { btnCssPrefix } from './Button.vars';

const DEFAULT_SIZE = 'sm';

export const createButtonVars = (varsKey: string): CSSProperties => {
  const p = btnCssPrefix(varsKey);

  return {
    '--button-bg': `var(--${p}-bg, transparent)`,
    '--button-color': `var(--${p}-color, var(--mantine-color-bright))`,
    '--button-bd': `var(--${p}-border, none)`,
    '--button-radius': `var(--${p}-radius, var(--mantine-radius-sm))`,
    '--button-fz': `var(--${p}-fz, var(--mantine-font-size-sm))`,
    '--button-padding-x': `var(--${p}-padding-x, var(--mantine-spacing-xs))`,
    '--button-hover': `var(--${p}-hover, transparent)`,
    '--button-hover-color': `var(--${p}-hover-color, var(--${p}-color, var(--mantine-color-text-dimmed)))`,
    '--button-active-bg': `var(--${p}-active-bg, var(--mantine-color-body))`,
    '--button-active-color': `var(--${p}-active-color, var(--mantine-color-text))`,
    '--button-active-border': `var(--${p}-active-border, var(--${p}-border, none))`,
    '--button-disabled-bg': `var(--${p}-disabled-bg, var(--mantine-color-body-dimmed))`,
    '--button-disabled-color': `var(--${p}-disabled-color, var(--mantine-color-text-dimmed))`,
    '--button-disabled-border': `var(--${p}-disabled-border, var(--${p}-border, none))`,
    '--mantine-spacing-xs': `var(--${p}-spacing-${DEFAULT_SIZE}, var(--mantine-spacing-xs))`,
    '--mantine-font-weight-medium': `var(--${p}-font-weight, var(--mantine-font-weight-medium))`,
    /**
     * Mantine does not read `--button-size`: height/padding/font-size come from the `size` prop in JS.
     * This line keeps the cascade; real sizing reads `--${p}-size` from `:root` into the `size` prop.
     */
    '--button-size': `var(--${p}-size, ${DEFAULT_SIZE})`,

    borderRadius: `var(--button-radius)`,
    backgroundColor: `var(--button-bg)`,
  } as CSSProperties;
};
