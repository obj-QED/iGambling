import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { useConfig } from '../../../context';
import { resolveSearchVariantComponent } from './registry';

function SearchBlockComponent({ item }: BlockProps) {
  const { blockVariants } = useConfig();
  const Variant = resolveSearchVariantComponent(blockVariants.search);
  return <Variant item={item} />;
}

export const SearchBlock = memo(SearchBlockComponent);
SearchBlock.displayName = 'SearchBlock';
