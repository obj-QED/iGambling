import type { ItemDropdownTriggerProps } from '../../../types';

import { forwardRef } from 'react';

import { AppActionIcon, AppButton } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../context';
import {
  hasItemImg,
  isIconOnlyItem,
  isRenderableItem,
  resolveHeaderMenuActionIconSize,
  resolveHeaderMenuButtonSize,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

const ItemDropdownTriggerComponent = forwardRef<HTMLButtonElement, ItemDropdownTriggerProps>(
  function ItemDropdownTriggerComponent({ item, rightSection, ...rest }, ref) {
    const menuSizes = useHeaderMenuSizes();
    const { activeAttrs } = useNavActive(item);
    const { onImgError, showItemImg, hideImageControl, iconControlAttrs } = useMediaState(item);

    if (!isRenderableItem(item)) return null;

    const label = resolveItemLabel(item);
    const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
    const buttonSize = resolveHeaderMenuButtonSize(item, menuSizes);
    const leftSection = showItemImg ? (
      <ItemImage item={item} alt={label} onImgFailed={onImgError} />
    ) : undefined;

    if (isIconOnlyItem(item) && hasItemImg(item) && rightSection === undefined) {
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
          {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
          {...activeAttrs}
          {...iconControlAttrs}
        >
          <ItemImage
            className="cmf-ActionIcon-icon-svg"
            item={item}
            alt={label}
            onImgFailed={onImgError}
          />
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
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        {...activeAttrs}
        {...iconControlAttrs}
      />
    );
  },
);

export const ItemDropdownTrigger = ItemDropdownTriggerComponent;
ItemDropdownTrigger.displayName = 'ItemDropdownTrigger';
