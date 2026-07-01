import type { ItemButtonProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { AppButton } from '@/elements/AppButton';
import { isValidAppHref } from '@/shared/lib';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import {
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemButtonVariant } from '../../../lib/menuItemVariant';
import { ASIDE_MENU_BUTTON_SIZE } from '../icons/iconProps';
import { MenuItemMedia } from '../MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/menu/ItemButton.module.scss';

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
  const { visible, onImgError, showItemImg, iconControlAttrs } = useMenuItemRenderable(item);

  if (isRenderableItem(item) === false || visible === false) return null;

  const iconOnly = isIconOnlyItem(item);
  const href = resolveItemHref(item.url);
  const hrefDisabled = dropdownTrigger === false && isValidAppHref(href) === false;
  const displayLabel = hasItemName(item) ? item.name : undefined;
  const ariaLabel = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <MenuItemMedia item={item} alt={ariaLabel} onImgError={onImgError} />
  ) : undefined;
  const justify: 'center' | 'flex-start' | 'space-between' =
    dropdownTrigger === true ? 'space-between' : iconOnly === true ? 'center' : 'flex-start';

  return (
    <AppButton
      label={displayLabel}
      aria-label={iconOnly === true ? ariaLabel : undefined}
      href={dropdownTrigger === true ? undefined : href}
      native={dropdownTrigger === true}
      disabled={hrefDisabled === true}
      className={clsx(styles.root, dropdownTrigger === true && styles.dropdownTrigger, className)}
      variant={resolveMenuItemButtonVariant(item)}
      size={ASIDE_MENU_BUTTON_SIZE}
      fullWidth
      justify={justify}
      leftSection={leftSection}
      rightSection={rightSection}
      {...(dropdownItem === true ? { 'data-sidebar-dropdown-item': true } : {})}
      {...(dropdownTrigger === true ? { 'data-sidebar-dropdown-trigger': true } : {})}
      {...menuItemDataAttrs(item)}
      {...iconControlAttrs}
      {...(dropdownTrigger === true
        ? {
            type: 'button' as const,
            onClick,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHaspopup,
          }
        : {})}
    />
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
