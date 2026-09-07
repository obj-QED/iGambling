import type { SidebarItemPresentationProps } from '../types';

import { memo, useMemo } from 'react';

import clsx from 'clsx';

import {
  CMF_DROPDOWN_ROLE_CHILD,
  CMF_DROPDOWN_ROLE_PARENT,
  controlAttrs,
  resolveCmfScope,
} from '@/shared/lib';
import { AppButton, AppTooltip } from '@/shared/ui';

import { useSidebarConfig } from '../../../context';
import { useAsideMenuButtonSize, useMenuItemRenderable } from '../../../hooks';
import {
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveItemNameInitial,
  resolveMenuItemButtonVariant,
} from '../../../lib';
import { ItemMedia } from '../../items/ItemMedia/ItemMedia';

import itemStyles from '../../../styles/items/ItemButton.module.scss';

/** On `.cmf-Button-section` (slot). */
const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_SECTION_CHEVRON = 'cmf-Button-section-chevron';
/** On media / SVG inside the section. */
const CMF_BUTTON_ICON = 'cmf-Button-icon';

function SlideoutItemComponent({
  item,
  rightSection,
  className,
  dropdownItem = false,
  dropdownTrigger = false,
  chrome,
  onClick,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHaspopup,
}: SidebarItemPresentationProps) {
  const { tooltip } = useSidebarConfig();
  const { visible, onImgError, showItemImg, iconControlAttrs } = useMenuItemRenderable(item);
  const size = useAsideMenuButtonSize();

  const iconOnly = isIconOnlyItem(item);
  const displayLabel = hasItemName(item) ? item.name : undefined;
  const ariaLabel = resolveItemLabel(item);
  const nameInitial = resolveItemNameInitial(item);

  const leftSection = useMemo(() => {
    if (showItemImg) {
      return (
        <ItemMedia
          item={item}
          alt={ariaLabel}
          onImgError={onImgError}
          className={CMF_BUTTON_ICON}
        />
      );
    }

    if (nameInitial !== null) {
      return (
        <span className={CMF_BUTTON_ICON} data-aside-slideout-initial aria-hidden>
          {nameInitial}
        </span>
      );
    }

    return undefined;
  }, [showItemImg, item, ariaLabel, onImgError, nameInitial]);

  const justify: 'flex-start' | 'space-between' = dropdownTrigger ? 'space-between' : 'flex-start';

  if (!isRenderableItem(item) || !visible) return null;

  const control = (
    <AppButton
      label={displayLabel}
      aria-label={iconOnly || !showItemImg ? ariaLabel : undefined}
      className={clsx(dropdownTrigger && itemStyles.dropdownTrigger, className)}
      variant={resolveMenuItemButtonVariant(item)}
      size={size}
      fullscreen
      justify={justify}
      leftSection={leftSection}
      rightSection={rightSection}
      sectionClassNames={{
        left: leftSection !== undefined ? CMF_BUTTON_SECTION_ICON : undefined,
        right: dropdownTrigger ? CMF_BUTTON_SECTION_CHEVRON : undefined,
      }}
      active={item.active}
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

  return (
    <AppTooltip
      label={item.label}
      name={item.name}
      config={tooltip}
      data-cmf-component={
        chrome === 'header' ? 'sidebar-header' : chrome === 'footer' ? 'sidebar-footer' : 'sidebar'
      }
      data-cmf-key="item"
    >
      {control}
    </AppTooltip>
  );
}

export const SlideoutItem = memo(SlideoutItemComponent);
SlideoutItem.displayName = 'SidebarSlideoutTypeItem';
