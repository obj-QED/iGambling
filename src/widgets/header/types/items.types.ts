export type HeaderMenuItem = {
  key: string;
  url: string;
  name: string;
  img?: string;
  items?: HeaderMenuItem[];
};

export type HeaderSection = {
  key: string;
  items: HeaderMenuItem[];
};

export type HeaderMenuModel = {
  sections: HeaderSection[];
};

export const HEADER_SPECIAL_BLOCK_KEYS = [
  'search',
  'logo',
  'bonus_box',
  'wallet',
  'notification',
  'color_scheme',
] as const;

/** Blocks injected via settings; UI is self-contained (no menu name/img). */
export const HEADER_CONFIG_ONLY_BLOCK_KEYS = ['color_scheme'] as const;

export type HeaderSpecialBlockKey = (typeof HEADER_SPECIAL_BLOCK_KEYS)[number];

export type HeaderConfigOnlyBlockKey = (typeof HEADER_CONFIG_ONLY_BLOCK_KEYS)[number];

export type HeaderBlockVariants = {
  search?: 'input' | 'icon' | 'modal';
  wallet?: 'compact' | 'full' | 'drawer';
  notification?: 'icon';
  logo?: 'default';
  bonus_box?: 'default';
};
