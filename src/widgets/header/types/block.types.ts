import type { HeaderMenuItem } from './items.types';
import type { ReactNode } from 'react';

export type SpecialIconBlockProps = {
  item: HeaderMenuItem;
  fallbackIcon: ReactNode;
  className?: string;
  disabled?: boolean;
};
