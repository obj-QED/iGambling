import type { ItemActionIconProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { AppActionIcon } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';

import { useAsideMenuButtonSize } from '../../../hooks';
import {
  hasItemImg,
  hasItemName,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
  resolveMenuItemCmfAttrs,
} from '../../../lib';
import { SidebarPhotoFallback } from '../icons/SidebarPhotoFallback';
import { ItemMedia } from '../ItemMedia/ItemMedia';

import styles from '../../../styles/items/ItemActionIcon.module.scss';

function resolveActionIconContent(
  item: ItemActionIconProps['item'],
  label: string,
  showItemImg: boolean,
  onImgError: (() => void) | undefined,
) {
  if (showItemImg && hasItemImg(item)) {
    return <ItemMedia item={item} alt={label} onImgError={onImgError} />;
  }

  if (hasItemName(item)) {
    return label.slice(0, 1).toUpperCase();
  }

  return <SidebarPhotoFallback />;
}

function ItemActionIconComponent({
  item,
  className,
  dropdownItem = false,
  dropdownTrigger = false,
  indicator,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: ItemActionIconProps) {
  const { activeAttrs } = useNavActive(item);
  const { onImgError, iconControlAttrs, showItemImg } = useMediaState(item);
  const size = useAsideMenuButtonSize();
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const content = resolveActionIconContent(item, label, showItemImg, onImgError);

  return (
    <AppActionIcon
      name={item.name}
      img={item.img}
      href={dropdownTrigger ? undefined : href}
      native={dropdownTrigger}
      hidden={false}
      className={clsx(styles.root, dropdownTrigger && styles.dropdownTrigger, className)}
      variant={resolveMenuItemActionIconVariant(item)}
      size={size}
      aria-label={label}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      onClick={onClick}
      {...(dropdownTrigger && { 'data-sidebar-dropdown-trigger': true })}
      {...(dropdownItem && { 'data-sidebar-dropdown-item': true })}
      {...resolveMenuItemCmfAttrs(item, { dropdownTrigger, dropdownItem })}
      {...activeAttrs}
      {...iconControlAttrs}
    >
      {content}
      {indicator && (
        <span className={styles.indicator} data-sidebar-dropdown-indicator>
          {indicator}
        </span>
      )}
    </AppActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'SidebarItemActionIcon';
