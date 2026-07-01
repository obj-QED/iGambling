import type { HeaderMenuItem } from '@/widgets/header';
import type { MouseEventHandler, ReactNode } from 'react';

export type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
  className?: string;
  /** Nested row inside `[data-sidebar-dropdown]`. */
  dropdownItem?: boolean;
  /** Dropdown parent — always `button`, never navigates via `url`. */
  dropdownTrigger?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu';
};

export type ItemActionIconProps = {
  item: HeaderMenuItem;
};

export type MenuItemMediaProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  onImgError?: () => void;
};

export type PromoBlockProps = {
  item: HeaderMenuItem;
  className?: string;
};

export type DropdownProps = {
  item: HeaderMenuItem;
  className?: string;
};

export type DropdownTriggerProps = {
  item: HeaderMenuItem;
  opened: boolean;
  onToggle: () => void;
};

export type DropdownMenuItemProps = {
  item: HeaderMenuItem;
};

export type ChevronProps = {
  opened: boolean;
};
