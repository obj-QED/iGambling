import type { ButtonVariant, MantineSize } from '@mantine/core';

/**
 * CMF-only Button variants.
 * Built-ins: Mantine `ButtonVariant`.
 * `exception-*` data-variant maps to paint key `exception` in `buttonVars`.
 */
export type CmfButtonCustomVariant = string & {};

/** Paint / cascade keys = Mantine built-ins + CMF custom (finite; not `exception-${string}`). */
export type CmfButtonVariant = ButtonVariant | CmfButtonCustomVariant;

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
