import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppLogo } from '@/shared/ui';

import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
} from '../../../lib';

function LogoBlockComponent({ item }: BlockProps) {
  if (!isRenderableItem(item)) return null;

  return (
    <AppLogo
      href={resolveItemHref(item.url)}
      label={resolveItemLabel(item)}
      img={item.img}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const LogoBlock = memo(LogoBlockComponent);
LogoBlock.displayName = 'LogoBlock';
