/**
 * Sidebar React contexts — grouped by concern.
 *
 * - `config/`   — resolved SidebarSchema
 * - `dropdown/` — open-key set for nested rows
 * - `size/`     — Mantine button size from CSS var
 * - `slideout/` — expand/collapse for `type: slideout` (logo-trigger)
 * - `typePack/` — default vs compact presentation pack
 */

export { SidebarConfigContext, SidebarConfigProvider, useSidebarConfig } from './config';
export { SidebarDropdownContext, SidebarDropdownProvider, useSidebarDropdown } from './dropdown';
export { AsideMenuSizeContext } from './size';
export type { SidebarSlideoutApi, SidebarSlideoutProviderProps } from './slideout';
export {
  SIDEBAR_SLIDEOUT_IDLE,
  SidebarSlideoutContext,
  SidebarSlideoutProvider,
  useSidebarSlideout,
} from './slideout';
export { SidebarTypePackContext, useSidebarTypePack } from './typePack';
