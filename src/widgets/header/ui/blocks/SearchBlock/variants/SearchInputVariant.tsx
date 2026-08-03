import type { BlockProps } from '../../../../types';

import { memo } from 'react';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { useHeaderMenuSizes } from '../../../../context';
import {
  isRenderableItem,
  menuItemDataAttrs,
  resolveHeaderMenuButtonSize,
  resolveItemLabel,
} from '../../../../lib';
import { HEADER_TABLER_ICON_PROPS } from '../../../items/icons/iconProps';

import styles from '../../../../styles/blocks/SearchInput.module.scss';

function SearchInputVariantComponent({ item }: BlockProps) {
  const menuSizes = useHeaderMenuSizes();

  if (!isRenderableItem(item)) return null;

  const label = resolveItemLabel(item);

  return (
    <TextInput
      className={styles.root}
      placeholder={label}
      aria-label={label}
      size={resolveHeaderMenuButtonSize(item, menuSizes)}
      leftSection={<IconSearch {...HEADER_TABLER_ICON_PROPS} />}
      {...menuItemDataAttrs(item)}
    />
  );
}

export const SearchInputVariant = memo(SearchInputVariantComponent);
SearchInputVariant.displayName = 'SearchInputVariant';
