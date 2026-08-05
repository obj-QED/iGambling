import type { HeaderMenuItem } from '../../../types';

import { forwardRef, memo } from 'react';

import { Menu } from '@mantine/core';

import { AppButton, type AppButtonProps } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { hasItemName, resolveItemHref, resolveItemLabel } from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

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
    const leftSection = showItemImg ? (
      <ItemImage item={item} alt={labelText} onImgFailed={onImgError} />
    ) : undefined;

    return (
      <AppButton
        ref={ref}
        {...buttonProps}
        label={named ? (item.name ?? labelText) : undefined}
        aria-label={named ? undefined : labelText}
        leftSection={leftSection}
      />
    );
  },
);

DeepPanelItemButton.displayName = 'DeepPanelItemButton';

function DeepPanelItemComponent({ item }: DeepPanelItemProps) {
  const { activeAttrs } = useNavActive(item);
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
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header', dropdown: true }))}
      {...activeAttrs}
      {...iconControlAttrs}
    />
  );
}

export const DeepPanelItem = memo(DeepPanelItemComponent);
DeepPanelItem.displayName = 'DeepPanelItem';
