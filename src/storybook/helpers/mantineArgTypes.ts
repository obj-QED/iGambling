/** Shared Storybook controls shaped like Mantine docs (variant, color, size, radius). */

import { MANTINE_BUTTON_VARIANTS } from '@/assets/theme';

/** @deprecated Prefer `MANTINE_BUTTON_VARIANTS` / `MANTINE_ACTION_ICON_VARIANTS` from `@/assets/theme`. */
export const MANTINE_STANDARD_VARIANTS = MANTINE_BUTTON_VARIANTS;

export const MANTINE_THEME_COLORS = [
  'brand',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
] as const;

export const MANTINE_RADIUS_OPTIONS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const mantinePlaygroundParameters = {
  layout: 'fullscreen' as const,
  controls: { expanded: true },
};

export function mantineVariantArgType(options: readonly string[], category = 'Appearance') {
  return {
    control: 'select',
    options: [...options],
    table: { category },
  };
}

export function mantineColorArgType() {
  return {
    control: 'select',
    options: [...MANTINE_THEME_COLORS],
    table: { category: 'Appearance' },
  };
}

export function mantineSizeArgType(options: readonly string[]) {
  return {
    control: 'inline-radio',
    options: [...options],
    table: { category: 'Layout' },
  };
}

export function mantineRadiusArgType() {
  return {
    control: 'inline-radio',
    options: [...MANTINE_RADIUS_OPTIONS],
    table: { category: 'Layout' },
  };
}

export function mantineBooleanArgType(category = 'State') {
  return {
    control: 'boolean',
    table: { category },
  };
}

export function mantineTextArgType(name = 'Label') {
  return {
    control: 'text',
    table: { category: 'Content' },
    name,
  };
}
