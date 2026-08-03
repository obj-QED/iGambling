import type { HeaderMenuModel } from '@/widgets/header';
import type { ReactNode } from 'react';

export type ShellProps = {
  /** Legacy auto-map when `children` omitted. */
  menu?: HeaderMenuModel;
  children?: ReactNode;
  className?: string;
};
