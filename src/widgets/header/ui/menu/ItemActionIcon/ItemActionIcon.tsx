import type { HeaderMenuItem } from '../../../types';

import { memo, useCallback, useState } from 'react';

import { ActionIcon } from '@mantine/core';

import { isValidAppHref } from '@/shared/lib';
import { AppLink } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../context/useHeaderMenuSizes';
import { resolveHeaderMenuActionIconSize } from '../../../lib/headerMenuSize';
import {
  hasItemImg,
  isIconOnlyItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { resolveMenuItemActionIconVariant } from '../../../lib/menuItemVariant';
import { MenuItemImage } from '../MenuItemImage/MenuItemImage';

import styles from '../../../styles/menu/ItemActionIcon.module.scss';

type ItemActionIconProps = {
  item: HeaderMenuItem;
};

function ItemActionIconComponent({ item }: ItemActionIconProps) {
  const menuSizes = useHeaderMenuSizes();
  const [imgFailed, setImgFailed] = useState(false);
  const onImgFailed = useCallback(() => {
    setImgFailed(true);
  }, []);

  if (isIconOnlyItem(item) === true && hasItemImg(item) === true && imgFailed === true) {
    return null;
  }

  const href = resolveItemHref(item.url);
  const hrefDisabled = isValidAppHref(href) === false;
  const label = resolveItemLabel(item);

  const content =
    hasItemImg(item) === true ? (
      <MenuItemImage item={item} alt={label} inActionIcon onImgFailed={onImgFailed} />
    ) : (
      label.slice(0, 1).toUpperCase()
    );
  const sharedProps = {
    className: styles.root,
    variant: resolveMenuItemActionIconVariant(item),
    size: resolveHeaderMenuActionIconSize(menuSizes),
    'aria-label': label,
    ...menuItemDataAttrs(item),
  };

  if (hrefDisabled) {
    return (
      <ActionIcon disabled {...sharedProps}>
        {content}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon component={AppLink} href={href} {...sharedProps}>
      {content}
    </ActionIcon>
  );
}

export const ItemActionIcon = memo(ItemActionIconComponent);
ItemActionIcon.displayName = 'ItemActionIcon';
