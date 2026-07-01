import type { ButtonProps } from '@mantine/core';

export type AppButtonProps = Omit<ButtonProps, 'children'> & {
  label?: string;
  href?: string;
  /** Native `<button>` — no `AppLink` (dropdown trigger, etc.). */
  native?: boolean;
};
