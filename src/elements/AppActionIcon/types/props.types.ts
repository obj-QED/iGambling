import type { ActionIconProps } from '@mantine/core';
import type { ReactNode } from 'react';

export type AppActionIconProps = Omit<ActionIconProps, 'children'> & {
  name?: string;
  img?: string;
  href?: string;
  children: ReactNode;
  hidden?: boolean;
  /** Native `<button>` — no `AppLink`. */
  native?: boolean;
};
