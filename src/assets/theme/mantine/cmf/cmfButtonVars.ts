import type { ButtonVariant, MantineSize } from '@mantine/core';

/**
 * Button variant prop — Mantine built-ins + any custom string.
 * Custom paints live in theme tokens (`--cmf-button-{variant}-*` or `data-cmf-key`), not a fixed list.
 */
export type CmfButtonVariant = ButtonVariant | (string & {});

/** @deprecated Use `CmfButtonVariant` — no finite CMF custom list. */
export type CmfButtonCustomVariant = string & {};

/** Runtime list tied to Mantine `ButtonVariant`. */
export const MANTINE_BUTTON_VARIANTS = [
  'filled',
  'light',
  'outline',
  'transparent',
  'white',
  'subtle',
  'default',
  'gradient',
] as const satisfies ReadonlyArray<ButtonVariant>;

export type CmfButtonSize = MantineSize;

export const CMF_BUTTON_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const satisfies ReadonlyArray<MantineSize>;
