import type { HeaderConfig } from '../types';
import type { ReactNode } from 'react';

import { ConfigContext } from './context';

export type ConfigProviderProps = {
  config: HeaderConfig;
  children: ReactNode;
};

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
