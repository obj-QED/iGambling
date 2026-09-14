import type { HeaderConfig } from '../types';

import { useRequiredContext } from '@/shared/hooks';

import { ConfigContext } from './context';

export function useConfig(): HeaderConfig {
  return useRequiredContext(ConfigContext, 'useConfig must be used within ConfigProvider');
}
