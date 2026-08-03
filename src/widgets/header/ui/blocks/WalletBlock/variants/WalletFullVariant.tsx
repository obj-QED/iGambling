import type { BlockProps } from '../../../../types';

import { memo, useRef } from 'react';

import { IconWallet } from '@tabler/icons-react';

import { AppButton } from '@/elements';
import { useCmfIconStyle, useMediaState } from '@/shared/hooks';
import { resolveCmfIconRadius, resolveCmfIconShape } from '@/shared/lib';

import { useHeaderMenuSizes } from '../../../../context';
import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveHeaderMenuButtonSize,
  resolveItemHref,
  resolveItemLabel,
  resolveMenuItemButtonVariant,
} from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { ItemIcon } from '../../../items/ItemIcon/ItemIcon';

function WalletFullVariantComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const iconRef = useRef<HTMLImageElement | HTMLSpanElement>(null);
  const cmfStyle = useCmfIconStyle(iconRef);
  const { onImgError, showItemImg, iconControlAttrs } = useMediaState(item);

  if (!isRenderableItem(item)) return null;

  const label = resolveItemLabel(item);
  const href = resolveItemHref(item.url);
  const leftSection = showItemImg ? (
    <ItemIcon
      ref={iconRef}
      src={item.img ?? ''}
      alt={label}
      shape={resolveCmfIconShape(item, cmfStyle)}
      radius={resolveCmfIconRadius(item, cmfStyle)}
      onError={onImgError}
    />
  ) : (
    <IconWallet {...HEADER_TABLER_ICON_PROPS} />
  );

  return (
    <AppButton
      label={item.name}
      href={href}
      variant={resolveMenuItemButtonVariant(item)}
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      leftSection={leftSection}
      {...menuItemDataAttrs(item)}
      {...iconControlAttrs}
    />
  );
}

export const WalletFullVariant = memo(WalletFullVariantComponent);
WalletFullVariant.displayName = 'WalletFullVariant';
