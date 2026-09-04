import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { Text } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

import { controlAttrs, resolveCmfScope } from '@/shared/lib';
import { AppActionIcon, AppDrawer, useAppDrawer } from '@/shared/ui';

import { useHeaderMenuSizes } from '../../../../context';
import {
  isRenderableItem,
  resolveHeaderMenuActionIconSize,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { HeaderActionIconTooltip } from '../../../shared/HeaderActionIconTooltip';

function WalletDrawerVariantComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();
  const { opened, open, close } = useAppDrawer();
  const label = resolveItemLabel(item);

  if (!isRenderableItem(item)) return null;

  return (
    <>
      <HeaderActionIconTooltip item={item}>
        <AppActionIcon
          name={item.name}
          img={item.img}
          native
          variant={resolveMenuItemActionIconVariant(item)}
          size={resolveHeaderMenuActionIconSize(menuSizes)}
          aria-label={label}
          onClick={open}
          {...controlAttrs(item, resolveCmfScope(item, { widget: 'header' }))}
        >
          <IconWallet {...HEADER_TABLER_ICON_PROPS} />
        </AppActionIcon>
      </HeaderActionIconTooltip>
      <AppDrawer opened={opened} onClose={close} title={label} position="right">
        <Text size="sm">{label}</Text>
      </AppDrawer>
    </>
  );
}

export const WalletDrawerVariant = memo(WalletDrawerVariantComponent);
WalletDrawerVariant.displayName = 'WalletDrawerVariant';
export default WalletDrawerVariant;
