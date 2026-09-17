import type { MenuItem as HeaderMenuItem, MenuItemRailMedia } from '@/entities/menu';
import type { ReactNode } from 'react';

import clsx from 'clsx';

import { renderSidebarRailGlyph, resolveItemNameInitial } from '../../../lib';
import { SidebarPhotoFallback } from '../icons/SidebarPhotoFallback';
import { ItemMedia } from '../ItemMedia/ItemMedia';

import styles from '../../../styles/items/ItemButton.module.scss';

export type ItemRailMarkProps = {
  item: HeaderMenuItem;
  kind: MenuItemRailMedia;
  alt: string;
  onImgError?: () => void;
  /** Extra class on img / letter / glyph. */
  className?: string;
  /** Class on the letter span (defaults to ItemButton nameLabel). */
  initialClassName?: string;
  glyphSize?: number;
  glyphStroke?: number;
  /** Prefer avatar styling for account-like img marks. */
  imgClassName?: string;
};

/**
 * Shared compact / slideout-rail mark — same chain for any menu row.
 * Kind from `resolveSidebarRailMedia(item, hasImg)`.
 */
export function ItemRailMark({
  item,
  kind,
  alt,
  onImgError,
  className,
  initialClassName,
  glyphSize = 22,
  glyphStroke = 1.5,
  imgClassName,
}: ItemRailMarkProps): ReactNode {
  if (kind === 'img') {
    return (
      <ItemMedia
        item={item}
        alt={alt}
        onImgError={onImgError}
        className={clsx(imgClassName, className)}
      />
    );
  }

  if (kind === 'glyph') {
    const glyph = renderSidebarRailGlyph(item, {
      className: clsx(className, 'cmf-ActionIcon-icon-svg'),
      size: glyphSize,
      stroke: glyphStroke,
      'aria-hidden': true,
    });
    if (glyph !== null) return glyph;
  }

  const initial = resolveItemNameInitial(item);
  if (initial !== null) {
    return (
      <span
        className={clsx(initialClassName ?? styles.nameLabel, className)}
        data-sidebar-item-label
      >
        {initial}
      </span>
    );
  }

  if (kind === 'glyph') {
    return <SidebarPhotoFallback />;
  }

  return <SidebarPhotoFallback />;
}
