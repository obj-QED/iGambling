import type { HeaderConfig } from '../types';

import { useContext } from 'react';

import { ConfigContext } from './context';

export function useConfig(): HeaderConfig {
  const config = useContext(ConfigContext);
  if (config === null) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return config;
}
