import type { ActionIconVariant, MantineSize } from '@mantine/core';

/**
 * ActionIcon variant prop — Mantine built-ins + any custom string.
 * Custom paints live in theme tokens (`--cmf-action-icon-{variant}-*` or `data-cmf-key`).
 */
export type CmfActionIconVariant = ActionIconVariant | (string & {});

/** @deprecated Use `CmfActionIconVariant` — no finite CMF custom list. */
export type CmfActionIconCustomVariant = string & {};

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
