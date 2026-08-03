import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Dropdown } from '../../items/Dropdown/Dropdown';

function DropdownBlockComponent({ item, className }: BlockProps) {
  return <Dropdown item={item} className={className} />;
}

export const DropdownBlock = memo(DropdownBlockComponent);
DropdownBlock.displayName = 'DropdownBlock';
