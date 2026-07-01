import type { ConfigProviderProps } from '../types';

import { ConfigContext } from './context';

export type { ConfigProviderProps } from '../types';

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
