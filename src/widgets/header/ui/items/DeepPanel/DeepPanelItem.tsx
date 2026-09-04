import type { HeaderMenuItem } from '../../../types';

import { forwardRef, memo, useMemo } from 'react';

import { Menu } from '@mantine/core';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton, type AppButtonProps } from '@/shared/ui';

import { hasItemName, resolveItemHref, resolveItemLabel } from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

const CMF_BUTTON_SECTION_ICON = 'cmf-Button-section-icon';
const CMF_BUTTON_ICON = 'cmf-Button-icon';

type DeepPanelItemProps = {
  item: HeaderMenuItem;
};

/**
 * Menu.Item strips `leftSection` and re-renders it as children — AppButton ignores those.
 * Build `leftSection` / `label` here so icon-only rows stay visible.
 */
type DeepPanelItemButtonProps = AppButtonProps & {
  item: HeaderMenuItem;
  named: boolean;
  showItemImg: boolean;
  labelText: string;
  onImgError: () => void;
};

const DeepPanelItemButton = forwardRef<HTMLButtonElement, DeepPanelItemButtonProps>(
  function DeepPanelItemButton(
    { item, named, showItemImg, labelText, onImgError, ...buttonProps },
    ref,
  ) {
    const leftSection = useMemo(
      () =>
        showItemImg ? (
          <ItemImage
            item={item}
            alt={labelText}
            className={CMF_BUTTON_ICON}
            onImgFailed={onImgError}
          />
        ) : undefined,
      [showItemImg, item, labelText, onImgError],
    );

    return (
      <AppButton
        ref={ref}
        {...buttonProps}
        label={named ? (item.name ?? labelText) : undefined}
        aria-label={named ? undefined : labelText}
        leftSection={leftSection}
        sectionClassNames={{
          left: leftSection !== undefined ? CMF_BUTTON_SECTION_ICON : undefined,
        }}
        active={item.active}
        matchRoute={item.matchRoute}
        activeMatch={item.activeMatch}
      />
    );
  },
);

DeepPanelItemButton.displayName = 'DeepPanelItemButton';

function DeepPanelItemComponent({ item }: DeepPanelItemProps) {
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const named = hasItemName(item);

  // No name + no usable img (missing or onError) → hide row.
  if (!named && !showItemImg) return null;

  const href = resolveItemHref(item.url);
  const labelText = resolveItemLabel(item);

  return (
    <Menu.Item
      component={DeepPanelItemButton}
      item={item}
      named={named}
      showItemImg={showItemImg}
      labelText={labelText}
      onImgError={onImgError}
      href={href}
      variant="outline"
      size="md"
      fullscreen
      justify="flex-start"
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header', chrome: 'dropdown' }))}
      {...iconControlAttrs}
    />
  );
}

export const DeepPanelItem = memo(DeepPanelItemComponent);
DeepPanelItem.displayName = 'DeepPanelItem';
