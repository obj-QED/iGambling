/**
 * Sidebar pure helpers — grouped by concern.
 *
 * - `item/`     — visibility, keys, labels, filter
 * - `layout/`   — split header/main/footer, width CSS
 * - `size/`     — `--aside-size-button` reader
 * - `dropdown/` — localStorage open-keys
 * - `variant/`  — Button / ActionIcon variant from item
 * - `footer/`   — known footer Tabler glyphs
 *
 * CMF scope: `resolveCmfScope` / `controlAttrs` from `@/shared/lib`.
 */

export {
  readSidebarDropdownOpenKeys,
  toggleSidebarDropdownOpenKey,
  writeSidebarDropdownOpenKeys,
} from './dropdown';
export { renderSidebarFooterIcon } from './footer';
export {
  filterRenderableItems,
  filterRenderableMenu,
  hasItemImg,
  hasItemName,
  hasRenderableMenuSections,
  isIconOnlyItem,
  isRenderableItem,
  isSpecialBlockKey,
  itemKey,
  menuItemKeyAttr,
  resolveItemHref,
  resolveItemLabel,
  shouldRenderMenuItem,
} from './item';
export { resolveSidebarWidth, type SidebarWidth, toSidebarWidthCss } from './layout';
export {
  hasSidebarLayoutContent,
  type SidebarLayoutModel,
  splitSidebarMenu,
} from './layout';
export {
  ASIDE_SIZE_BUTTON_VAR,
  DEFAULT_ASIDE_MENU_BUTTON_SIZE,
  readAsideMenuButtonSize,
} from './size';
export {
  resolveLogoControlVariant,
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
  resolveMenuItemExplicitVariant,
  type SidebarMenuButtonVariant,
} from './variant';
/** @deprecated Use `CmfChromeRegion` from `@/shared/lib`. */
export type { CmfChromeRegion as SidebarChromeRegion } from '@/shared/lib';
