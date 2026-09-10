import type { MantineColorsTuple } from '@mantine/core';

/** JS fallback when `--brand-color-*` from brand-palette.scss is unavailable. Keep in sync with that file. */
export const BRAND_PALETTE_LIGHT_FALLBACK = [
  '#fff',
  '#ccfbf1',
  '#5eead4',
  '#2dd4bf',
  '#14b8a6',
  '#0d9488',
  '#0f766e',
  '#115e59',
  '#134e4a',
  '#042f2e',
] as const;

/** Amber/orange — mirrors `$palette-dark` in brand-palette.scss (SoT). */
export const BRAND_PALETTE_DARK_FALLBACK = [
  '#fff',
  '#ffeacb',
  '#ffd49a',
  '#ffbd64',
  '#ffa937',
  '#ff9c1b',
  '#ff9200',
  '#e38200',
  '#cb7300',
  '#915201',
] as const;

/** Default export for mantineTheme — matches defaultColorScheme: dark. */
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
