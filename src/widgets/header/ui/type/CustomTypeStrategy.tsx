import type { RootProps } from '../../types';

import { memo } from 'react';

import { Shell } from '../Shell';

function ClassicTypeStrategyComponent({ menu, config }: RootProps) {
  return <Shell menu={menu} config={config} />;
}

export const ClassicTypeStrategy = memo(ClassicTypeStrategyComponent);
ClassicTypeStrategy.displayName = 'ClassicTypeStrategy';
