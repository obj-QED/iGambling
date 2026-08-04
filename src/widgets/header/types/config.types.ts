import type { HeaderBlockVariants } from './items.types';
import type {
  HeaderCustomBlockConfig,
  HeaderLayoutKey,
  HeaderTypeKey,
} from '@/shared/config/headerSettings';
import type { TooltipConfig } from '@/shared/config/tooltipSettings';
import type { SchemaVersion, WrapperMode } from '@/shared/schema';

export type { HeaderCustomBlockConfig, HeaderLayoutKey, HeaderTypeKey };

export type HeaderBehaviorConfig = {
  sticky: boolean;
  transparent: boolean;
  hideOnScroll: boolean;
};

export type HeaderWrappersConfig = Partial<Record<string, WrapperMode>>;

export type HeaderCapabilitiesConfig = Record<string, boolean>;

/**
 * Resolved header schema — components receive this; they do not read settings.
 * `HeaderConfig` is an alias for backward compatibility.
 */
export type HeaderSchema = {
  version: SchemaVersion;
  layout: HeaderLayoutKey;
  type: HeaderTypeKey;
  blockVariants: HeaderBlockVariants;
  wrappers: HeaderWrappersConfig;
  behavior: HeaderBehaviorConfig;
  capabilities: HeaderCapabilitiesConfig;
  customBlocks?: HeaderCustomBlockConfig[];
  tooltip: TooltipConfig;
};

/** @deprecated Prefer `HeaderSchema` */
export type HeaderConfig = HeaderSchema;
