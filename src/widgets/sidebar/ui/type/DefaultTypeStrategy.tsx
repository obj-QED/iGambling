import type { RootProps } from '../../types';

import { memo } from 'react';

import { Shell } from '../Shell';

function DefaultTypeStrategyComponent({ menu }: RootProps) {
  if (menu === null) return null;
  return <Shell menu={menu} />;
}

export const DefaultTypeStrategy = memo(DefaultTypeStrategyComponent);
DefaultTypeStrategy.displayName = 'SidebarDefaultTypeStrategy';
