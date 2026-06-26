import {
  HEADER_SPECIAL_BLOCK_KEYS,
  type HeaderSpecialBlockKey,
} from '@/shared/config/headerSpecialBlockKeys';

export { HEADER_SPECIAL_BLOCK_KEYS, type HeaderSpecialBlockKey };

export type HeaderMenuItemType = 'button' | 'link';

export type HeaderMenuItem = {
  key: string;
  url: string;
  name: string;
  img?: string;
  /** Only for default menu items — not used on special blocks (`search`, `logo`, …). */
  type?: HeaderMenuItemType;
  items?: HeaderMenuItem[];
};

export type HeaderSection = {
  key: string;
  items: HeaderMenuItem[];
};

export type HeaderMenuModel = {
  sections: HeaderSection[];
};

export const HEADER_CONFIG_ONLY_BLOCK_KEYS = ['color_scheme'] as const;

export type HeaderConfigOnlyBlockKey = (typeof HEADER_CONFIG_ONLY_BLOCK_KEYS)[number];

export type HeaderBlockVariants = {
  search?: 'input' | 'icon' | 'modal';
  wallet?: 'compact' | 'full' | 'drawer';
  notification?: 'icon';
  logo?: 'default';
  bonus_box?: 'default';
};
