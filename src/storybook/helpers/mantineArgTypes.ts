/** Shared Storybook controls — select dropdowns with optional «none». */

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

/** Sentinel for “prop not set” in select controls (maps to `undefined` in render). */
export const STORYBOOK_NONE = '__none__' as const;
export const STORYBOOK_NONE_LABEL = '— none —';

export const mantinePlaygroundParameters = {
  layout: 'fullscreen' as const,
  controls: { expanded: true },
};

type SelectArgOptions = {
  category?: string;
  /** When true, first option is empty → prop omitted. */
  allowNone?: boolean;
};

function withNoneOption(options: readonly string[], allowNone: boolean): string[] {
  return allowNone ? [STORYBOOK_NONE, ...options] : [...options];
}

export function mantineSelectArgType(options: readonly string[], opts: SelectArgOptions = {}) {
  const { category = 'Appearance', allowNone = false } = opts;
  const list = withNoneOption(options, allowNone);

  return {
    control: {
      type: 'select' as const,
      labels: allowNone
        ? Object.fromEntries(
            list.map((value) => [value, value === STORYBOOK_NONE ? STORYBOOK_NONE_LABEL : value]),
          )
        : undefined,
    },
    options: list,
    table: { category },
  };
}

export function mantineVariantArgType(options: readonly string[], category = 'Appearance') {
  return mantineSelectArgType(options, { category, allowNone: true });
}

export function mantineColorArgType(allowNone = true) {
  return mantineSelectArgType(MANTINE_THEME_COLORS, { category: 'Appearance', allowNone });
}

export function mantineSizeArgType(options: readonly string[], allowNone = true) {
  return mantineSelectArgType(options, { category: 'Layout', allowNone });
}

export function mantineRadiusArgType(allowNone = true) {
  return mantineSelectArgType(MANTINE_RADIUS_OPTIONS, { category: 'Layout', allowNone });
}

export function mantineBooleanArgType(category = 'State') {
  return {
    control: 'boolean' as const,
    table: { category },
  };
}

export function mantineTextArgType(name = 'Label') {
  return {
    control: 'text' as const,
    table: { category: 'Content' },
    name,
  };
}

/** Drop empty sentinel before passing args to the component. */
export function omitStorybookNone<T extends Record<string, unknown>>(args: T): Partial<T> {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value === STORYBOOK_NONE || value === undefined || value === null) continue;
    next[key] = value;
  }
  return next as Partial<T>;
}
