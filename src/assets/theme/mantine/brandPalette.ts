import type { MantineColorsTuple } from '@mantine/core';

/** JS fallback when `--brand-color-*` from theme.scss is unavailable. Keep in sync with brand-palette.scss. */
export const BRAND_PALETTE_LIGHT_FALLBACK = [
  '#f0fdfa',
  '#ccfbf1',
  '#99f6e4',
  '#5eead4',
  '#2dd4bf',
  '#14b8a6',
  '#0d9488',
  '#0f766e',
  '#115e59',
  '#134e4a',
] as const;

export const BRAND_PALETTE_DARK_FALLBACK = [
  '#ecfeff',
  '#cffafe',
  '#a5f3fc',
  '#67e8f9',
  '#22d3ee',
  '#06b6d4',
  '#0891b2',
  '#0e7490',
  '#155e75',
  '#164e63',
] as const;

/** Default export for mantineTheme — matches defaultColorScheme: dark (cyan). */
export const BRAND_PALETTE_FALLBACK = BRAND_PALETTE_DARK_FALLBACK;

export function createBrandColorsTuple(
  fallback: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ],
): MantineColorsTuple {
  return [
    `var(--brand-color-0, ${fallback[0]})`,
    `var(--brand-color-1, ${fallback[1]})`,
    `var(--brand-color-2, ${fallback[2]})`,
    `var(--brand-color-3, ${fallback[3]})`,
    `var(--brand-color-4, ${fallback[4]})`,
    `var(--brand-color-5, ${fallback[5]})`,
    `var(--brand-color-6, ${fallback[6]})`,
    `var(--brand-color-7, ${fallback[7]})`,
    `var(--brand-color-8, ${fallback[8]})`,
    `var(--brand-color-9, ${fallback[9]})`,
  ];
}
