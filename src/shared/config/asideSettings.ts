import type {
  HeaderCustomBlockInput,
  HeaderCustomBlockPlacement,
  HeaderCustomBlockSettings,
} from './headerSettings';

export type AsideTypeKey = 'default';

export const ASIDE_TYPE_KEYS = ['default'] as const satisfies readonly AsideTypeKey[];

export type AsideSettings = {
  /** Sidebar width on desktop (px). Mobile uses 100% via CSS. */
  width?: number;
  type?: AsideTypeKey;
  /** `true` → sidebar menu from `src/widgets/sidebar/mocks` */
  mockMenu?: boolean;
  customBlocks?: HeaderCustomBlockSettings[];
};

export type { HeaderCustomBlockInput, HeaderCustomBlockPlacement, HeaderCustomBlockSettings };
