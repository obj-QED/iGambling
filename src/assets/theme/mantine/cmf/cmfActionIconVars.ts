import type { ActionIconVariant, MantineSize } from '@mantine/core';

/**
 * CMF-only ActionIcon variants.
 * Built-ins: Mantine `ActionIconVariant` (props already allow `variant | (string & {})`).
 * Other custom strings still cascade in vars; this list is for Storybook / known docs.
 */
export const CMF_ACTION_ICON_VARIANTS = ['hero', 'hero-light', 'hero-outline'] as const;

export type CmfActionIconCustomVariant = (typeof CMF_ACTION_ICON_VARIANTS)[number] | (string & {});

/** Paint / cascade keys = Mantine built-ins + CMF custom. */
export type CmfActionIconVariant = ActionIconVariant | CmfActionIconCustomVariant;

/** Runtime list tied to Mantine `ActionIconVariant` (TS errors if upstream adds/renames). */
export const MANTINE_ACTION_ICON_VARIANTS = [
  'filled',
  'light',
  'outline',
  'transparent',
  'white',
  'subtle',
  'default',
  'gradient',
] as const satisfies ReadonlyArray<ActionIconVariant>;

export const MANTINE_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const satisfies ReadonlyArray<MantineSize>;

/** ActionIcon size prop: MantineSize | `input-${MantineSize}`. */
export type CmfActionIconSize = MantineSize | `input-${MantineSize}`;

export const CMF_ACTION_ICON_SIZES = [
  ...MANTINE_SIZES,
  ...MANTINE_SIZES.map((size) => `input-${size}` as const),
] as const satisfies ReadonlyArray<CmfActionIconSize>;
