/**
 * Sidebar pure helpers — grouped by concern.
 *
 * - `item/`     — visibility, keys, labels, filter
 * - `layout/`   — split header/main/footer, width CSS
 * - `size/`     — `--aside-size-button` reader
 * - `dropdown/` — localStorage open-keys
 * - `slideout/` — localStorage expanded flag
 * - `variant/`  — Button / ActionIcon variant from item
 * - `footer/`   — known footer Tabler glyphs
 *
 * CMF scope: `resolveCmfScope` / `controlAttrs` from `@/shared/lib`.
 */

export {
  createSidebarDropdownOpenKeysStore,
  readSidebarDropdownOpenKeys,
  type SidebarDropdownOpenKeysStore,
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
  hasSidebarRailGlyph,
  isIconOnlyItem,
  isRenderableItem,
  isSpecialBlockKey,
  itemKey,
  menuItemKeyAttr,
  type MenuItemRailMedia,
  renderSidebarRailGlyph,
  resolveItemHref,
  resolveItemLabel,
  resolveItemNameInitial,
  resolveSidebarRailMedia,
  shouldRenderMenuItem,
  SIDEBAR_RAIL_MEDIA,
} from './item';
export {
  resolveSidebarWidth,
  type SidebarRootWidthStyle,
  type SidebarWidth,
  toSidebarRootWidthStyle,
  toSidebarWidthCss,
} from './layout';
export { hasSidebarLayoutContent, type SidebarLayoutModel, splitSidebarMenu } from './layout';
export {
  ASIDE_SIZE_BUTTON_VAR,
  asideMenuButtonSizeForType,
  DEFAULT_ASIDE_MENU_BUTTON_SIZE,
  readAsideMenuButtonSize,
} from './size';
export {
  readSidebarSlideoutExpanded,
  resolveSidebarSlideoutPhase,
  SIDEBAR_SLIDEOUT_EXPANDED_DEFAULT,
  type SidebarSlideoutPhase,
  writeSidebarSlideoutExpanded,
} from './slideout';
export {
  resolveLogoControlVariant,
  resolveMenuItemActionIconVariant,
  resolveMenuItemButtonVariant,
  resolveMenuItemExplicitVariant,
  type SidebarMenuButtonVariant,
} from './variant';
/** @deprecated Use `chrome?: string` on `ResolveCmfScopeOptions` from `@/shared/lib`. */
export type SidebarChromeRegion = string;
