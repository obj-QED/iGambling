import { MANTINE_THEME_COLORS } from '@/storybook/helpers/mantineArgTypes';

export type StorybookPrimaryColor = (typeof MANTINE_THEME_COLORS)[number];

export const STORYBOOK_PRIMARY_SHADE_KEYS = ['4', '5', '6', '7', '8'] as const;
export type StorybookPrimaryShadeKey = (typeof STORYBOOK_PRIMARY_SHADE_KEYS)[number];

export const STORYBOOK_THEME_GLOBAL_TYPES = {
  primaryColor: {
    name: 'Primary color',
    description:
      'Mantine theme.primaryColor. CMF Button/ActionIcon cascade often uses brand-* CSS vars — prefer Color scheme for brand QA.',
    defaultValue: 'brand' satisfies StorybookPrimaryColor,
    toolbar: {
      icon: 'contrast',
      items: MANTINE_THEME_COLORS.map((value) => ({ value, title: value })),
      dynamicTitle: true,
    },
  },
  primaryShade: {
    name: 'Primary shade',
    description: 'Mantine theme.primaryShade for light + dark schemes',
    defaultValue: '7' satisfies StorybookPrimaryShadeKey,
    toolbar: {
      icon: 'mirror',
      items: STORYBOOK_PRIMARY_SHADE_KEYS.map((value) => ({
        value,
        title: `shade ${value}`,
      })),
      dynamicTitle: true,
    },
  },
};

export function readStorybookPrimaryColor(globals: Record<string, unknown>): StorybookPrimaryColor {
  const value = String(globals.primaryColor);
  return (MANTINE_THEME_COLORS as readonly string[]).includes(value)
    ? (value as StorybookPrimaryColor)
    : 'brand';
}

export function readStorybookPrimaryShade(globals: Record<string, unknown>): number {
  const raw = String(globals.primaryShade);
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 && n <= 9 ? n : 7;
}
