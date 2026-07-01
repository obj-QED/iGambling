import { memo } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import styles from '../../../styles/menu/Chevron.module.scss';

type ChevronProps = {
  opened?: boolean;
};

function ChevronComponent({ opened = false }: ChevronProps) {
  return (
    <IconChevronDown
      className={styles.root}
      size={16}
      stroke={1.75}
      aria-hidden
      data-opened={opened ? 'true' : 'false'}
    />
  );
}

export const Chevron = memo(ChevronComponent);
Chevron.displayName = 'Chevron';
