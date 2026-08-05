import type { BlockProps } from '../../../../types';

import { memo, useCallback, useState } from 'react';

import { Drawer, Text } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';

import { AppActionIcon } from '@/elements';
import { controlAttrs, resolveCmfScope } from '@/shared/lib';

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
  const [opened, setOpened] = useState(false);
  const label = resolveItemLabel(item);

  const open = useCallback(() => {
    setOpened(true);
  }, []);
  const close = useCallback(() => {
    setOpened(false);
  }, []);

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
      <Drawer opened={opened} onClose={close} title={label} position="right">
        <Text size="sm">{label}</Text>
      </Drawer>
    </>
  );
}

export const WalletDrawerVariant = memo(WalletDrawerVariantComponent);
WalletDrawerVariant.displayName = 'WalletDrawerVariant';
