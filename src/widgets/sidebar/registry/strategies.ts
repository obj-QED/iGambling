import type { AsideTypeKey, RootProps } from '../types';
import type { ComponentType } from 'react';

import { DefaultTypeStrategy } from '../ui/type/DefaultTypeStrategy';

export const TYPE_STRATEGY_REGISTRY: Record<AsideTypeKey, ComponentType<RootProps>> = {
  default: DefaultTypeStrategy,
};
