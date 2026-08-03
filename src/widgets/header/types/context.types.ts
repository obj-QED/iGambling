import type { HeaderConfig } from './config.types';
import type { ReactNode } from 'react';

export type ConfigProviderProps = {
  config: HeaderConfig;
  children: ReactNode;
};
