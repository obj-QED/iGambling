export { resolveSidebarTypePack, TYPE_PACK_REGISTRY } from '../ui/type';
export { BLOCK_REGISTRY, registerBlocks, resolveBlockComponent } from './blocks';
export {
  type BlockRoutingKey,
  isSidebarBlockRegistryKey,
  resolveBlockRegistryKey,
  type SidebarBlockRegistryKey,
} from './keys';
export { LAYOUT_REGISTRY, resolveSidebarLayout } from './layouts';
/** @deprecated Use `resolveSidebarTypePack(type).Strategy` */
export { resolveSidebarTypeStrategy, TYPE_STRATEGY_REGISTRY } from './strategies';
/** @deprecated Use `resolveSidebarTypePack(type).styles` */
export { resolveSidebarTypeStyles, TYPE_STYLE_REGISTRY } from './typeStyles';
