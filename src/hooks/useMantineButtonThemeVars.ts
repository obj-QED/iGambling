import { useMemo } from 'react';

type MantineButtonThemeVarKey =
  | '--button-bg'
  | '--button-color'
  | '--button-hover'
  | '--button-bd'
  | '--button-radius';

type MantineButtonThemeVars = Partial<Record<MantineButtonThemeVarKey, string>>;

const VAR_SUFFIX_TO_BUTTON_VAR: ReadonlyArray<readonly [string, MantineButtonThemeVarKey]> = [
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
