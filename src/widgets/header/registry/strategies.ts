import type { HeaderTypeKey, RootProps } from '../types';
import type { ComponentType } from 'react';

import { ClassicTypeStrategy } from '../ui/type/CustomTypeStrategy';
import { DefaultTypeStrategy } from '../ui/type/DefaultTypeStrategy';

export const TYPE_STRATEGY_REGISTRY: Record<HeaderTypeKey, ComponentType<RootProps>> = {
  default: DefaultTypeStrategy,
  custom: ClassicTypeStrategy,
};
