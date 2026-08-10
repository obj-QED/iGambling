/**
 * Sidebar React contexts — grouped by concern.
 *
 * - `config/`   — resolved SidebarConfig
 * - `dropdown/` — open-key set for nested rows
 * - `size/`     — Mantine button size from CSS var
 * - `typePack/` — default vs compact presentation pack
 */

export { SidebarConfigContext, SidebarConfigProvider, useSidebarConfig } from './config';
export { SidebarDropdownContext, SidebarDropdownProvider, useSidebarDropdown } from './dropdown';
export { AsideMenuSizeContext } from './size';
export { SidebarTypePackContext, useSidebarTypePack } from './typePack';
