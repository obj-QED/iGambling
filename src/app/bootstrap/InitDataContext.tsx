import type { InitKey, TranslationKey } from '@api/lobby/queryFns';
import type { InitV2Content, Words } from '@api/lobby/types';
import type { UseApiQueryResult } from '@api/types';
import type { ReactNode } from 'react';

import { createContext } from 'react';

import { useRequiredContext } from '@/shared/hooks';

export type InitDataContextValue = {
  language: string;
  init: UseApiQueryResult<InitV2Content>;
  translation: UseApiQueryResult<Words>;
  initKey: InitKey;
  translationKey: TranslationKey;
};

const InitDataContext = createContext<InitDataContextValue | null>(null);

export function InitDataProvider({
  value,
  children,
}: {
  value: InitDataContextValue;
  children: ReactNode;
}) {
  return <InitDataContext.Provider value={value}>{children}</InitDataContext.Provider>;
}

export function useInitDataContext(): InitDataContextValue {
  return useRequiredContext(
    InitDataContext,
    'useInitDataContext must be used within InitDataProvider',
  );
}
