import type { DropdownItemProps } from '../../../types';

import { memo } from 'react';

import { Menu } from '@mantine/core';

import { AppButton } from '@/elements';
import { useMediaState, useNavActive } from '@/shared/hooks';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../context';
import { resolveHeaderMenuButtonSize, resolveItemHref, resolveItemLabel } from '../../../lib';
import { ItemImage } from '../ItemImage/ItemImage';

function DropdownItemComponent({ item }: DropdownItemProps) {
  const menuSizes = useHeaderMenuSizes();
  const { activeAttrs } = useNavActive(item);
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);
  const href = resolveItemHref(item.url);
  const label = resolveItemLabel(item);
  const leftSection = showItemImg ? (
    <ItemImage item={item} alt={label} onImgFailed={onImgError} />
  ) : undefined;
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
      {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
      {...activeAttrs}
      {...iconControlAttrs}
    />
  );
}

export const DropdownItem = memo(DropdownItemComponent);
DropdownItem.displayName = 'DropdownItem';
