import type { RootProps } from '../../types';

import { memo } from 'react';

import { Shell } from '../Shell';

function DefaultTypeStrategyComponent({ menu, config }: RootProps) {
  return <Shell menu={menu} config={config} />;
}

export const DefaultTypeStrategy = memo(DefaultTypeStrategyComponent);
DefaultTypeStrategy.displayName = 'DefaultTypeStrategy';
