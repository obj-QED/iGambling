import type { ActionIconProps } from '@mantine/core';
import type { MouseEventHandler, ReactNode } from 'react';

export type AppActionIconProps = Omit<ActionIconProps, 'children'> & {
  name?: string;
  img?: string;
  href?: string;
  children: ReactNode;
  hidden?: boolean;
  /** Native `<button>` only — skip href click navigation. */
  native?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};
