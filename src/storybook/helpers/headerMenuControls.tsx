import type { ReactNode } from 'react';

import { resolveHeaderConfig } from '@/widgets/header/config/resolve';
import { ConfigProvider } from '@/widgets/header/context/provider';

import '@/widgets/header/registry/registerBlocks';

type HeaderMenuControlsShellProps = {
  children: ReactNode;
};

/** Config + block registry for isolated header menu control demos. */
export function HeaderMenuControlsShell({ children }: HeaderMenuControlsShellProps) {
  return <ConfigProvider config={resolveHeaderConfig()}>{children}</ConfigProvider>;
}
