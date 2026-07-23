import type { HeaderMenuItem } from './items.types';
import type { ReactNode } from 'react';

export type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
};

export type ItemActionIconProps = {
  item: HeaderMenuItem;
};

export type MenuItemImageProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  onImgFailed?: () => void;
};

export type ItemMenuTriggerProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
};

export type DropdownProps = {
  item: HeaderMenuItem;
};

export type DropdownMenuItemProps = {
  item: HeaderMenuItem;
};

export type ChevronProps = {
  open?: boolean;
};
