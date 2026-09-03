import type { ActionIconProps } from '@mantine/core';
import type { MouseEventHandler } from 'react';

export type MenuToggleProps = Omit<ActionIconProps, 'children' | 'onClick'> & {
  /** Whether the sidebar drawer is open. */
  opened: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
};
