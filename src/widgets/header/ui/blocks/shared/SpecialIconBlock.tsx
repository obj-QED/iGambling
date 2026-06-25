import type { HeaderMenuItem } from '../../../types';
import type { ReactNode } from 'react';

import { memo, useState } from 'react';

import { ActionIcon } from '@mantine/core';
import clsx from 'clsx';

import { AppLink } from '@/shared/ui';

import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib/itemUtils';
import { HeaderPhotoFallback } from '../../menu/icons/HeaderPhotoFallback';
import { HEADER_MENU_ACTION_ICON_SIZE } from '../../menu/icons/iconProps';
import { ItemIcon } from '../../menu/ItemIcon/ItemIcon';

import styles from '../../../styles/blocks/SpecialIconBlock.module.scss';

type SpecialIconBlockProps = {
  item: HeaderMenuItem;
  fallbackIcon: ReactNode;
  className?: string;
};

function SpecialIconBlockComponent({ item, fallbackIcon, className }: SpecialIconBlockProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (hasItemName(item) === false && hasItemImg(item) === false) return null;
  if (isRenderableItem(item) === false) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const icon =
    hasItemImg(item) === true && imgFailed === false ? (
      <ItemIcon
        src={item.img ?? ''}
        alt={label}
        onError={() => {
          setImgFailed(true);
        }}
      />
    ) : hasItemImg(item) === true && imgFailed === true ? (
      <HeaderPhotoFallback />
    ) : (
      fallbackIcon
    );

  const rootClassName = clsx(styles.root, className);

  if (href.length > 0) {
    return (
      <ActionIcon
        className={rootClassName}
        component={AppLink}
        href={href}
        variant="default"
        size={HEADER_MENU_ACTION_ICON_SIZE}
        aria-label={label}
        data-menu-key={item.key}
      >
        {icon}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      className={rootClassName}
      variant="default"
      size={HEADER_MENU_ACTION_ICON_SIZE}
      aria-label={label}
      data-menu-key={item.key}
    >
      {icon}
    </ActionIcon>
  );
}

export const SpecialIconBlock = memo(SpecialIconBlockComponent);
SpecialIconBlock.displayName = 'SpecialIconBlock';
