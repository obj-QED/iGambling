import type { DropdownItemProps } from '../../../types';

import { memo, useMemo } from 'react';

import { Menu } from '@mantine/core';

import { useMediaState } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppButton } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context';
import { resolveHeaderMenuButtonSize, resolveItemHref, resolveItemLabel } from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

function DropdownItemComponent({ item }: DropdownItemProps) {
  const menuSizes = useHeaderMenuSizes();
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = useMemo(
    () =>
      showItemImg ? <ItemImage item={item} alt={label} onImgFailed={onImgError} /> : undefined,
    [showItemImg, item, label, onImgError],
  );
  const content = item.name ?? label;

  return (
    <Menu.Item
      component={AppButton}
      href={href}
      label={content}
      leftSection={leftSection}
      variant="outline"
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      fullscreen
      justify="flex-start"
      active={item.active}
      matchRoute={item.matchRoute}
      activeMatch={item.activeMatch}
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
      {...iconControlAttrs}
    />
  );
}

export const DropdownItem = memo(DropdownItemComponent);
DropdownItem.displayName = 'DropdownItem';
