import type { ContextModalProps } from '@mantine/modals';
import type { FC } from 'react';

import { SearchModalContext } from '@/shared/ui/AppSearch/type/modal';

export const appModals = {
  search: SearchModalContext,
} as const satisfies Record<string, FC<ContextModalProps>>;

declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof appModals;
  }
}
