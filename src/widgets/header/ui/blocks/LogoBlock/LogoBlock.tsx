import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { AppLogo } from '@/shared/ui';

import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../lib';

/** Cascade SoT key — match `--cmf-button-header-logo-*` tokens. */
const LOGO_CMF_KEY = 'logo';

function LogoBlockComponent({ item }: BlockProps) {
  if (!isRenderableItem(item)) return null;

  return (
    <AppLogo
      href={resolveItemHref(item.url)}
      label={resolveItemLabel(item)}
      img={item.img}
      variant={resolveMenuItemButtonVariant(item)}
      {...menuItemDataAttrs(item)}
      data-cmf-key={LOGO_CMF_KEY}
    />
  );
}

export const LogoBlock = memo(LogoBlockComponent);
LogoBlock.displayName = 'LogoBlock';
