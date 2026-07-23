import type { ItemMenuTriggerProps } from '../../../types';

import { forwardRef } from 'react';

import { AppActionIcon } from '@/elements/AppActionIcon';
import { AppButton } from '@/elements/AppButton';
import { useMediaState } from '@/shared/hooks/useMediaState';
import { useMenuActive } from '@/shared/hooks/useMenuActive';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import {
  resolveHeaderMenuActionIconSize,
  resolveHeaderMenuButtonSize,
} from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  isIconOnlyItem,
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import {
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
} from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

const ItemMenuTriggerComponent = forwardRef<HTMLButtonElement, ItemMenuTriggerProps>(
  function ItemMenuTriggerComponent({ item, rightSection, ...rest }, ref) {
    const menuSizes = useHeaderMenuSizes();
    const { menuActiveAttrs } = useMenuActive(item);
    const { onImgError, showItemImg, hideImageControl, iconControlAttrs } = useMediaState(item);

    if (isRenderableItem(item) === false) return null;

    const label = resolveItemLabel(item);
    const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
    const buttonSize = resolveHeaderMenuButtonSize(item, menuSizes);
    const leftSection = showItemImg ? (
      <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
    ) : undefined;

    if (isIconOnlyItem(item) === true && hasItemImg(item) === true) {
      return (
        <AppActionIcon
          {...rest}
          ref={ref}
          native
          name={item.name}
          img={item.img}
          hidden={hideImageControl}
          variant={resolveMenuItemActionIconVariant(item)}
          size={actionIconSize}
          aria-label={label}
          aria-haspopup="menu"
          {...menuItemDataAttrs(item)}
          {...menuActiveAttrs}
          {...iconControlAttrs}
        >
          <MenuItemImage item={item} alt={label} onImgFailed={onImgError} />
        </AppActionIcon>
      );
    }

    return (
      <AppButton
        {...rest}
        ref={ref}
        native
        label={item.name}
        variant={resolveMenuItemButtonVariant(item)}
        size={buttonSize}
        leftSection={leftSection}
        rightSection={rightSection}
        aria-label={label}
        aria-haspopup="menu"
        {...menuItemDataAttrs(item)}
        {...menuActiveAttrs}
        {...iconControlAttrs}
      />
    );
  },
);

export const ItemMenuTrigger = ItemMenuTriggerComponent;
ItemMenuTrigger.displayName = 'ItemMenuTrigger';
