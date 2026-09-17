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

import { useSidebarSlideout } from '../../../context';
import { useAsideMenuButtonSize, useMenuItemRenderable } from '../../../hooks';
import {
  hasItemName,
  isIconOnlyItem,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
  resolveSidebarRailMedia,
} from '../../../lib';
import { ItemMedia } from '../ItemMedia/ItemMedia';
import { ItemRailMark } from '../ItemRailMark/ItemRailMark';

import styles from '../../../styles/items/ItemButton.module.scss';

/** On `.cmf-Button-section` (slot). */
const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_SECTION_CHEVRON = 'cmf-Button-section-chevron';
/** On media / SVG inside the section. */
const CMF_BUTTON_ICON = 'cmf-Button-icon';

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
  const { enabled: slideoutOn, phase: slideoutPhase } = useSidebarSlideout();
  const size = useAsideMenuButtonSize();

  const iconOnly = isIconOnlyItem(item);
  const displayLabel = hasItemName(item) ? item.name : undefined;
  const ariaLabel = resolveItemLabel(item);
  /** Rail mark on settled collapsed only — expanding mirrors collapsing (labels + img). */
  const railMark = slideoutOn && slideoutPhase === 'collapsed';
  const railKind = resolveSidebarRailMedia(item, showItemImg);

  const leftSection = useMemo(() => {
    if (railMark) {
      return (
        <ItemRailMark
          item={item}
          kind={railKind}
          alt={ariaLabel}
          onImgError={onImgError}
          className={CMF_BUTTON_ICON}
          initialClassName={clsx(styles.nameLabel, CMF_BUTTON_ICON)}
        />
      );
    }

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

    return undefined;
  }, [railMark, railKind, showItemImg, item, ariaLabel, onImgError]);
  const justify: 'flex-start' | 'space-between' = dropdownTrigger ? 'space-between' : 'flex-start';

  if (!isRenderableItem(item) || !visible) return null;

  return (
    <AppButton
      label={displayLabel}
      aria-label={iconOnly ? ariaLabel : undefined}
      className={clsx(styles.root, dropdownTrigger && styles.dropdownTrigger, className)}
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
