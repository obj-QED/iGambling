import type { ItemButtonProps } from '../../../types';

import { memo, useMemo } from 'react';

import clsx from 'clsx';

import {
  CMF_DROPDOWN_ROLE_CHILD,
  CMF_DROPDOWN_ROLE_PARENT,
  controlAttrs,
  resolveCmfScope,
} from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useAsideMenuButtonSize, useMenuItemRenderable } from '../../../hooks';
import {
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemMedia } from '../ItemMedia/ItemMedia';

import styles from '../../../styles/items/ItemButton.module.scss';

function ItemButtonComponent({
  item,
  rightSection,
  className,
  dropdownItem = false,
  dropdownTrigger = false,
  chrome,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: ItemButtonProps) {
  const { visible, onImgError, showItemImg, iconControlAttrs } = useMenuItemRenderable(item);
  const size = useAsideMenuButtonSize();

  const iconOnly = isIconOnlyItem(item);
  const displayLabel = hasItemName(item) ? item.name : undefined;
  const ariaLabel = resolveItemLabel(item);
  const leftSection = useMemo(
    () =>
      showItemImg ? <ItemMedia item={item} alt={ariaLabel} onImgError={onImgError} /> : undefined,
    [showItemImg, item, ariaLabel, onImgError],
  );
  const justify: 'flex-start' | 'space-between' = dropdownTrigger ? 'space-between' : 'flex-start';

  if (!isRenderableItem(item) || !visible) return null;

  return (
    <AppButton
      label={displayLabel}
      aria-label={iconOnly ? ariaLabel : undefined}
      className={clsx(dropdownTrigger && styles.dropdownTrigger, className)}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify={justify}
      leftSection={leftSection}
      rightSection={rightSection}
      active={item.active}
      // Parent is toggle-only — never URL-active from `item.url`.
      matchRoute={dropdownTrigger ? false : item.matchRoute}
      activeMatch={item.activeMatch}
      {...(dropdownItem && { 'data-sidebar-dropdown-item': true })}
      {...(dropdownTrigger && { 'data-sidebar-dropdown-trigger': true })}
      {...controlAttrs(
        item,
        resolveCmfScope(item, {
          widget: 'sidebar',
          ...(chrome
            ? { chrome }
            : dropdownTrigger
              ? { chrome: 'dropdown', role: CMF_DROPDOWN_ROLE_PARENT }
              : dropdownItem
                ? { chrome: 'dropdown', role: CMF_DROPDOWN_ROLE_CHILD }
                : {}),
        }),
      )}
      {...iconControlAttrs}
      {...(dropdownTrigger
        ? {
            // Parent `url: '#'` ignored — toggle only, never disabled-for-href.
            href: undefined,
            native: true,
            disabled: false,
            type: 'button' as const,
            onClick,
            'aria-expanded': ariaExpanded,
            'aria-haspopup': ariaHaspopup,
          }
        : {
            href: resolveItemHref(item.url),
            native: false,
          })}
    />
  );
}

export const ItemButton = memo(ItemButtonComponent);
ItemButton.displayName = 'ItemButton';
