import type { CSSProperties } from 'react';

import { useMemo } from 'react';

type MantineButtonThemeVars = CSSProperties & {
  '--button-bg'?: string;
  '--button-color'?: string;
  '--button-hover'?: string;
  '--button-bd'?: string;
  '--button-radius'?: string;
};

const VAR_SUFFIX_TO_BUTTON_VAR: ReadonlyArray<readonly [string, keyof MantineButtonThemeVars]> = [
  ['bg', '--button-bg'],
  ['color', '--button-color'],
  ['hover', '--button-hover'],
  ['border', '--button-bd'],
  ['radius', '--button-radius'],
];

/**
 * Builds Mantine Button CSS vars from theme vars in :root.
 * If a source var is missing/empty, that Button var is not set and Mantine default is kept.
 */
export function useMantineButtonThemeVars(prefix: string): MantineButtonThemeVars | undefined {
  return useMemo(() => {
    if (typeof window === 'undefined') return undefined;

    const rootStyles = window.getComputedStyle(document.documentElement);
    const vars: MantineButtonThemeVars = {};

    for (const [suffix, buttonVarName] of VAR_SUFFIX_TO_BUTTON_VAR) {
      const sourceVarName = `--${prefix}-${suffix}`;
      const sourceValue = rootStyles.getPropertyValue(sourceVarName).trim();
      if (sourceValue.length > 0) {
        vars[buttonVarName] = `var(${sourceVarName})`;
      }
    }

    return Object.keys(vars).length > 0 ? vars : undefined;
  }, [prefix]);
}
