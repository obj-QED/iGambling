import type { HeaderMenuItem } from '@/widgets/header';

import { memo } from 'react';

import { Button } from '@mantine/core';
import clsx from 'clsx';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
} from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { ASIDE_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { MenuItemMedia } from '../MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/menu/ItemButton.module.scss';

type ItemButtonProps = {
  item: HeaderMenuItem;
  rightSection?: React.ReactNode;
  className?: string;
  /** Nested row inside `[data-sidebar-dropdown]`. */
  dropdownItem?: boolean;
  /** Dropdown parent — always `button`, never navigates via `url`. */
  dropdownTrigger?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu';
};

function ItemButtonComponent({
  item,
  rightSection,
  className,
  dropdownItem = false,
  dropdownTrigger = false,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: ItemButtonProps) {
  const { visible, onImgError, label } = useMenuItemRenderable(item);

  if (isRenderableItem(item) === false || visible === false) return null;

  const href = resolveItemHref(item.url);
  const hrefDisabled = dropdownTrigger === false && isValidAppHref(href) === false;
  const variant = resolveMenuItemButtonVariant(item);
  const leftSection =
    hasItemImg(item) === true ? (
      <MenuItemMedia item={item} alt={label} onImgError={onImgError} />
    ) : undefined;
  const content = hasItemName(item) === true ? label : null;
  const justify: 'flex-start' | 'space-between' = dropdownTrigger ? 'space-between' : 'flex-start';
  const dataAttrs = menuItemDataAttrs(item);
  const sharedProps = {
    className: clsx(styles.root, dropdownTrigger && styles.dropdownTrigger, className),
    variant,
    size: ASIDE_MENU_BUTTON_SIZE,
    fullWidth: true,
    justify,
    leftSection,
    rightSection,
    ...(dropdownItem ? { 'data-sidebar-dropdown-item': true } : {}),
    ...(dropdownTrigger ? { 'data-sidebar-dropdown-trigger': true } : {}),
    ...dataAttrs,
    ...(dropdownTrigger
      ? {
          type: 'button' as const,
          onClick,
          'aria-expanded': ariaExpanded,
          'aria-haspopup': ariaHaspopup,
        }
      : {}),
    ...(hrefDisabled ? { disabled: true as const } : {}),
  };

  if (dropdownTrigger === false && hrefDisabled === false) {
    return (
      <Button component={AppLink} href={href} {...sharedProps}>
        {content}
      </Button>
    );
  }

  return <Button {...sharedProps}>{content}</Button>;
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
