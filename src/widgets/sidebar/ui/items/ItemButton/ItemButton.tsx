import type { ItemButtonProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { AppButton } from '@/elements';
import { useNavActive } from '@/shared/hooks';

import { useAsideMenuButtonSize, useMenuItemRenderable } from '../../../hooks';
import {
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
  resolveMenuItemCmfAttrs,
} from '../../../lib';
import { ItemMedia } from '../ItemMedia/ItemMedia';

import styles from '../../../styles/items/ItemButton.module.scss';

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
  const { activeAttrs } = useNavActive(item);
  const size = useAsideMenuButtonSize();

  if (!isRenderableItem(item) || !visible) return null;

  const iconOnly = isIconOnlyItem(item);
  const href = resolveItemHref(item.url);
  const displayLabel = hasItemName(item) ? item.name : undefined;
  const ariaLabel = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <ItemMedia item={item} alt={ariaLabel} onImgError={onImgError} />
  ) : undefined;
  const justify: 'flex-start' | 'space-between' = dropdownTrigger ? 'space-between' : 'flex-start';

  return (
    <AppButton
      label={displayLabel}
      aria-label={iconOnly ? ariaLabel : undefined}
      href={dropdownTrigger ? undefined : href}
      native={dropdownTrigger}
      className={clsx(dropdownTrigger && styles.dropdownTrigger, className)}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullWidth
      justify={justify}
      leftSection={leftSection}
      rightSection={rightSection}
      {...(dropdownItem && { 'data-sidebar-dropdown-item': true })}
      {...(dropdownTrigger && { 'data-sidebar-dropdown-trigger': true })}
      {...resolveMenuItemCmfAttrs(item, { dropdownTrigger, dropdownItem })}
      {...activeAttrs}
      {...iconControlAttrs}
      {...(dropdownTrigger
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
