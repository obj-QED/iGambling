export {
  DEFAULT_SIDEBAR_CONFIG,
  resolveSidebarConfig,
  resolveSidebarSchema,
  type SidebarSchemaLayer,
} from './config';
export { getSidebarMenuMock } from './mocks/getSidebarMenuMock';
export type { AppSidebarProps } from './types';
export type {
  AsideTypeKey,
  BlockProps,
  RootProps,
  SectionProps,
  SidebarBlockVariants,
  SidebarConfig,
  SidebarRegionsConfig,
  SidebarSchema,
  SidebarScrollAreaConfig,
} from './types';
export {
  SEARCH_ADAPTER_KEYS as SIDEBAR_SEARCH_ADAPTER_KEYS,
  type SearchAdapterKey as SidebarSearchAdapterVariant,
} from './ui/blocks/Search/adapters';
export {
  PROMO_ADAPTER_KEYS as SIDEBAR_PROMO_ADAPTER_KEYS,
  type PromoAdapterKey as SidebarPromoAdapterVariant,
} from './ui/blocks/PromoBlock/adapters';
export { Root as AppSidebar } from './ui/Root';
export type { SidebarItemPresentationProps, SidebarTypePack } from './ui/type';
