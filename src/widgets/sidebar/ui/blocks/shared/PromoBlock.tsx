import type { PromoBlockProps } from '../../../types';

import { memo } from 'react';

import clsx from 'clsx';

import { AppLink } from '@/shared/ui';

import { useMenuItemRenderable } from '../../../hooks/useMenuItemRenderable';
import {
  hasItemImg,
  hasItemName,
  isRenderableItem,
  menuItemKeyAttr,
  resolveItemHref,
} from '../../../lib/itemUtils';
import { MenuItemMedia } from '../../menu/MenuItemMedia/MenuItemMedia';

import styles from '../../../styles/blocks/PromoBlock.module.scss';

function PromoBlockComponent({ item, className }: PromoBlockProps) {
  const { visible, onImgError, label } = useMenuItemRenderable(item);

  if (isRenderableItem(item) === false || visible === false) return null;

  const href = resolveItemHref(item.url);
  const media =
    hasItemImg(item) === true ? (
      <MenuItemMedia item={item} alt={label} onImgError={onImgError} />
    ) : null;
  const content = (
    <>
      {media}
      {hasItemName(item) === true ? <span className={styles.label}>{item.name}</span> : null}
    </>
  );

  if (href.length > 0) {
    return (
      <AppLink
        href={href}
        className={clsx(styles.root, className)}
        data-sidebar-block={item.key}
        {...menuItemKeyAttr(item)}
      >
        {content}
      </AppLink>
    );
  }

  return (
    <div
      className={clsx(styles.root, className)}
      data-sidebar-block={item.key}
      {...menuItemKeyAttr(item)}
    >
      {content}
    </div>
  );
}

export const PromoBlock = memo(PromoBlockComponent);
PromoBlock.displayName = 'PromoBlock';
