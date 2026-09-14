import type { HeaderTypePack } from '../ui/type/types';

import { createContext } from 'react';

import { useRequiredContext } from '@/shared/hooks';

export const HeaderTypePackContext = createContext<HeaderTypePack | null>(null);

export function useHeaderTypePack(): HeaderTypePack {
  return useRequiredContext(
    HeaderTypePackContext,
    'useHeaderTypePack must be used within HeaderTypePackProvider',
  );
}
