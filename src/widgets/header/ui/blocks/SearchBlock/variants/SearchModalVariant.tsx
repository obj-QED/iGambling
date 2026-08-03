import type { BlockProps } from '../../../../types';

import { memo, useCallback, useState } from 'react';

import { Modal, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { AppActionIcon } from '@/elements';

import { useHeaderMenuSizes } from '../../../../context';
import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveHeaderMenuActionIconSize,
  resolveItemLabel,
  resolveMenuItemActionIconVariant,
} from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';
import { HeaderActionIconTooltip } from '../../../shared/HeaderActionIconTooltip';

function SearchModalVariantComponent({ item }: BlockProps) {
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
          {...menuItemDataAttrs(item)}
        >
          <IconSearch {...HEADER_TABLER_ICON_PROPS} />
        </AppActionIcon>
      </HeaderActionIconTooltip>
      <Modal opened={opened} onClose={close} title={label} centered>
        <TextInput
          placeholder={label}
          aria-label={label}
          leftSection={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
          data-autofocus
        />
      </Modal>
    </>
  );
}

export const SearchModalVariant = memo(SearchModalVariantComponent);
SearchModalVariant.displayName = 'SearchModalVariant';
