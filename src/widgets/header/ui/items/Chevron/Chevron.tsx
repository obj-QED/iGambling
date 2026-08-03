import type { ChevronProps } from '../../../types';

import { memo } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../icons/iconProps';

import styles from '../../../styles/items/Chevron.module.scss';

function ChevronComponent({ open = false }: ChevronProps) {
  return (
    <IconChevronDown
      {...HEADER_TABLER_ICON_PROPS}
      className={styles.root}
      data-menu-chevron
      data-open={open || undefined}
    />
  );
}

export const Chevron = memo(ChevronComponent);
Chevron.displayName = 'Chevron';
