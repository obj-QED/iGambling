import type { BlockRegistryKey } from '../../registry/keys';
import type { BlockProps, RootProps } from '../../types';
import type { HeaderTypeTunables } from './tunableDefaults';
import type { HeaderTypeStrategyKey } from '@/shared/config';
import type { ComponentType } from 'react';

export type HeaderTypeStyles = {
  readonly root: string;
};

export type HeaderTypePack = {
  key: HeaderTypeStrategyKey;
  Strategy: ComponentType<RootProps>;
  styles: HeaderTypeStyles;
  blocks?: Partial<Record<BlockRegistryKey, ComponentType<BlockProps>>>;
  defaults: HeaderTypeTunables;
};
