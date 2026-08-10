import type { RootProps } from '../../../types';

import { memo } from 'react';

import { Shell } from '../../Shell';

function CustomStrategyComponent({ menu, config }: RootProps) {
  return <Shell menu={menu} config={config} />;
}

export const CustomStrategy = memo(CustomStrategyComponent);
CustomStrategy.displayName = 'HeaderCustomTypeStrategy';
