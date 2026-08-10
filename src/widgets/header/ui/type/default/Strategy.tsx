import type { RootProps } from '../../../types';

import { memo } from 'react';

import { Shell } from '../../Shell';

function DefaultStrategyComponent({ menu, config }: RootProps) {
  return <Shell menu={menu} config={config} />;
}

export const DefaultStrategy = memo(DefaultStrategyComponent);
DefaultStrategy.displayName = 'HeaderDefaultTypeStrategy';
