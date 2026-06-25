import { memo } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import { HEADER_TABLER_ICON_PROPS } from '../icons/iconProps';

import styles from '../../../styles/menu/Chevron.module.scss';

type ChevronProps = {
  open?: boolean;
};

function ChevronComponent({ open = false }: ChevronProps) {
  return (
    <IconChevronDown
      {...HEADER_TABLER_ICON_PROPS}
      className={styles.root}
      data-open={open === true ? true : undefined}
    />
  );
}

export const Chevron = memo(ChevronComponent);
Chevron.displayName = 'Chevron';
