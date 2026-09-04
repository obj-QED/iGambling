import type { ItemDropdownTriggerProps } from '../../../types';

import { forwardRef, useMemo } from 'react';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppActionIcon, AppButton } from '@/shared/ui';

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

/** On `.cmf-Button-section` (slot). */
const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_SECTION_CHEVRON = 'cmf-Button-section-chevron';
/** On media / SVG inside the section. */
const CMF_BUTTON_ICON = 'cmf-Button-icon';

const ItemDropdownTriggerComponent = forwardRef<HTMLButtonElement, ItemDropdownTriggerProps>(
  function ItemDropdownTriggerComponent({ item, rightSection, ...rest }, ref) {
    const menuSizes = useHeaderMenuSizes();
    const { onImgError, showItemImg, hideImageControl, iconControlAttrs } = useMediaState(item);
    const label = resolveItemLabel(item);
    const actionIconSize = resolveHeaderMenuActionIconSize(menuSizes);
    const buttonSize = resolveHeaderMenuButtonSize(item, menuSizes);
    const leftSection = useMemo(
      () =>
        showItemImg ? (
          <ItemImage item={item} alt={label} className={CMF_BUTTON_ICON} onImgFailed={onImgError} />
        ) : undefined,
      [showItemImg, item, label, onImgError],
    );
    const actionIconMedia = useMemo(
      () => (
        <ItemImage
          className="cmf-ActionIcon-icon-svg"
          item={item}
          alt={label}
          onImgFailed={onImgError}
        />
      ),
      [item, label, onImgError],
    );

    if (!isRenderableItem(item)) return null;

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
          active={item.active}
          matchRoute={item.matchRoute}
          activeMatch={item.activeMatch}
          {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
          {...iconControlAttrs}
        >
          {actionIconMedia}
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
        sectionClassNames={{
          left: leftSection !== undefined ? CMF_BUTTON_SECTION_ICON : undefined,
          right: rightSection !== undefined ? CMF_BUTTON_SECTION_CHEVRON : undefined,
        }}
        aria-label={label}
        aria-haspopup="menu"
        active={item.active}
        matchRoute={item.matchRoute}
        activeMatch={item.activeMatch}
        {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        {...iconControlAttrs}
      />
    );
  },
);

export const ItemDropdownTrigger = ItemDropdownTriggerComponent;
ItemDropdownTrigger.displayName = 'ItemDropdownTrigger';
