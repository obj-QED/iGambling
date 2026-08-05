import type { SidebarConfig } from '@/widgets/sidebar/types';
import type { ReactNode } from 'react';

import { resolveSidebarConfig } from '@/widgets/sidebar/config/resolve';
import {
  AsideMenuSizeContext,
  SidebarConfigProvider,
  SidebarDropdownProvider,
  SidebarTypePackContext,
} from '@/widgets/sidebar/context';
import { DEFAULT_ASIDE_MENU_BUTTON_SIZE } from '@/widgets/sidebar/lib';
import { resolveSidebarTypePack } from '@/widgets/sidebar/ui/type';

import '@/widgets/sidebar/registry/registerBlocks';

type SidebarBlockShellProps = {
  children: ReactNode;
  /** Patch resolved aside config for the demo. */
  configPatch?: Partial<SidebarConfig>;
};

/** Config + type pack + block registry for isolated sidebar block demos. */
export function SidebarBlockShell({ children, configPatch }: SidebarBlockShellProps) {
  const config = { ...resolveSidebarConfig(), ...configPatch };
  const typePack = resolveSidebarTypePack(config.type);

  return (
    <SidebarConfigProvider config={config}>
      <SidebarTypePackContext.Provider value={typePack}>
        <AsideMenuSizeContext.Provider value={DEFAULT_ASIDE_MENU_BUTTON_SIZE}>
          <SidebarDropdownProvider defaultOpenKeys={config.openedDropdowns}>
            <div
              data-widget="sidebar"
              data-cmf-component="sidebar"
              data-type={config.type}
              style={{
                maxWidth: typeof config.width === 'number' ? config.width : 360,
                width: typeof config.width === 'number' ? config.width : undefined,
              }}
            >
              {children}
            </div>
          </SidebarDropdownProvider>
        </AsideMenuSizeContext.Provider>
      </SidebarTypePackContext.Provider>
    </SidebarConfigProvider>
  );
}
