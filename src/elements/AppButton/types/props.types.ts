import type { ButtonProps } from '@mantine/core';
import type { MouseEventHandler, ReactNode } from 'react';

export type AppButtonProps = Omit<ButtonProps, 'children' | 'fullWidth'> & {
  label?: ReactNode;
  href?: string;
  /** Stretch to container width (maps to Mantine `fullWidth`). */
  fullscreen?: boolean;
  /** Native `<button>` only — skip href click navigation (dropdown trigger, etc.). */
  native?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

export function hasAppButtonContent(
  label: ReactNode | undefined,
  leftSection: ReactNode | undefined,
  rightSection: ReactNode | undefined,
): boolean {
  if (leftSection !== undefined || rightSection !== undefined) return true;
  if (label === undefined || label === null) return false;
  if (typeof label === 'string') return label.length > 0;
  return true;
}
