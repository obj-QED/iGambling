import type { HeaderMenuItem } from './items.types';
import type { ReactNode } from 'react';

export type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
};

export type ItemActionIconProps = {
  item: HeaderMenuItem;
};

export type ItemImageProps = {
  item: HeaderMenuItem;
  alt: string;
  className?: string;
  onImgFailed?: () => void;
};

export type ItemDropdownTriggerProps = {
  item: HeaderMenuItem;
  rightSection?: ReactNode;
  onPointerEnter?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
};

export type DropdownProps = {
  item: HeaderMenuItem;
};

export type DropdownItemProps = {
  item: HeaderMenuItem;
};

export type ChevronProps = {
  open?: boolean;
};
