import type { CmfActiveIndicatorValue } from './cmfActiveIndicator.types';

import { createContext, useContext } from 'react';

import { DEFAULT_CMF_ACTIVE_CONFIG } from '@/shared/config/cmfActiveSettings';

export type { CmfActiveIndicatorValue } from './cmfActiveIndicator.types';

const CmfActiveIndicatorContext = createContext<CmfActiveIndicatorValue>(DEFAULT_CMF_ACTIVE_CONFIG);

export function CmfActiveIndicatorProvider({
  value,
  children,
}: {
  value: CmfActiveIndicatorValue;
  children: React.ReactNode;
}) {
  return (
    <CmfActiveIndicatorContext.Provider value={value}>
      {children}
    </CmfActiveIndicatorContext.Provider>
  );
}

/** Widget-scoped active chrome (`line` | `element`). Default `element` outside providers. */
export function useCmfActiveIndicator(): CmfActiveIndicatorValue {
  return useContext(CmfActiveIndicatorContext);
}
