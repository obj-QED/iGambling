import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import clsx from 'clsx';

import { AppLink } from '@/shared/ui';

import { isRenderableItem, menuItemKeyAttr, resolveItemHref } from '../../../lib/itemUtils';

import styles from '../../../styles/blocks/SearchLeftMenuBlock.module.scss';

function SearchLeftMenuBlockComponent({ item, className }: BlockProps) {
  if (isRenderableItem(item) === false) return null;

  const href = resolveItemHref(item.url);
  const placeholder = item.name ?? 'Search';
  const input = (
    <TextInput
      className={styles.input}
      placeholder={placeholder}
      leftSection={<IconSearch size={16} stroke={1.75} aria-hidden />}
      data-sidebar-block={item.key}
      {...menuItemKeyAttr(item)}
      readOnly
    />
  );

  if (href.length > 0) {
    return (
      <AppLink href={href} className={clsx(styles.root, className)} {...menuItemKeyAttr(item)}>
        {input}
      </AppLink>
    );
  }

  return (
    <div className={clsx(styles.root, className)} {...menuItemKeyAttr(item)}>
      {input}
    </div>
  );
}

export const SearchLeftMenuBlock = memo(SearchLeftMenuBlockComponent);
SearchLeftMenuBlock.displayName = 'SearchLeftMenuBlock';
