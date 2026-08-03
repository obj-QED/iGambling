export { resolveSidebarTypePack, TYPE_PACK_REGISTRY } from '../typePacks';
export { BLOCK_REGISTRY, registerBlocks, resolveBlockComponent } from './blocks';
export {
  type BlockRoutingKey,
  isSidebarBlockRegistryKey,
  resolveBlockRegistryKey,
  type SidebarBlockRegistryKey,
} from './keys';

/** @deprecated Use `resolveSidebarTypePack(type).Strategy` */
export { resolveSidebarTypeStrategy, TYPE_STRATEGY_REGISTRY } from './strategies';
/** @deprecated Use `resolveSidebarTypePack(type).styles` */
export { resolveSidebarTypeStyles, TYPE_STYLE_REGISTRY } from './typeStyles';
