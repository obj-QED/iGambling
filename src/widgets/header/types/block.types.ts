import type { HeaderMenuItem } from './items.types';
import type { MouseEventHandler, ReactNode } from 'react';

export type SpecialIconBlockProps = {
  item: HeaderMenuItem;
  fallbackIcon: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
