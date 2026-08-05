import type { HeaderMenuItem } from '@/widgets/header';
import type { MouseEventHandler, ReactNode } from 'react';

export type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
  className?: string;
  /** Nested row inside `[data-sidebar-dropdown]`. */
  dropdownItem?: boolean;
  /** Dropdown parent — toggle only: no `href`, no URL `data-active`. */
  dropdownTrigger?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu';
};

export type ItemActionIconProps = {
  item: HeaderMenuItem;
  className?: string;
  /** Nested row inside `[data-sidebar-dropdown]`. */
  dropdownItem?: boolean;
  /** Dropdown parent — toggle only: no `href`, no URL `data-active`. */
  dropdownTrigger?: boolean;
  /** Extra node inside the control (e.g. chevron for compact dropdown). */
  indicator?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu';
};

export type ItemMediaProps = {
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

export type DropdownItemProps = {
  item: HeaderMenuItem;
};

export type ChevronProps = {
  opened: boolean;
};
