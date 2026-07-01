import type { BlockProps } from '../../../types';

import { memo } from 'react';

import { Dropdown } from '../../menu/Dropdown/Dropdown';

function DropdownBlockComponent({ item }: BlockProps) {
  return <Dropdown item={item} />;
}

export const DropdownBlock = memo(DropdownBlockComponent);
DropdownBlock.displayName = 'DropdownBlock';
