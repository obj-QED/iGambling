export {
  DEFAULT_HEADER_CONFIG,
  type HeaderSchemaLayer,
  resolveHeaderConfig,
  resolveHeaderSchema,
} from './config';
export { mapRoot, mergeCustomBlock } from './lib';
export type {
  BlockProps,
  HeaderBlockVariants,
  HeaderConfig,
  HeaderLayoutKey,
  HeaderMenuItem,
  HeaderMenuModel,
  HeaderSchema,
  HeaderSection,
  HeaderTypeKey,
  RootProps,
  SectionProps,
} from './types';
export type { RootProps as AppHeaderProps, BlockProps as HeaderBlockProps } from './types';
export {
  SEARCH_ADAPTER_KEYS,
  type SearchAdapterKey,
} from './ui/blocks/SearchBlock/adapters';
export {
  WALLET_ADAPTER_KEYS,
  type WalletAdapterKey,
} from './ui/blocks/WalletBlock/adapters';
export { Root as AppHeader } from './ui/Root';
