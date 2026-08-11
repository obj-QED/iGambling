import type { NavActiveMatch } from '@/shared/lib';
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
  /** Explicit active from API/schema — overrides URL matching. */
  active?: boolean;
  /** When `false`, skip route active matching. Default: `true`. */
  matchRoute?: boolean;
  /** Internal route match mode. Default: `exact`. */
  activeMatch?: NavActiveMatch;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};
