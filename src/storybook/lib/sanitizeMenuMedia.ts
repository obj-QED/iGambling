import type { HeaderMenuItem, HeaderMenuModel } from '@/widgets/header/types';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

/** Tabler outline SVGs under `public/icons/tabler/` (Storybook demos). */
export const STORYBOOK_TABLER = {
  search: publicAssetUrl('icons/tabler/search.svg'),
  wallet: publicAssetUrl('icons/tabler/wallet.svg'),
  user: publicAssetUrl('icons/tabler/user.svg'),
  home: publicAssetUrl('icons/tabler/home.svg'),
  bell: publicAssetUrl('icons/tabler/bell.svg'),
  bellRinging: publicAssetUrl('icons/tabler/bell-ringing.svg'),
  gift: publicAssetUrl('icons/tabler/gift.svg'),
  giftCard: publicAssetUrl('icons/tabler/gift-card.svg'),
  flame: publicAssetUrl('icons/tabler/flame.svg'),
  trophy: publicAssetUrl('icons/tabler/trophy.svg'),
  dice: publicAssetUrl('icons/tabler/dice.svg'),
  cards: publicAssetUrl('icons/tabler/cards.svg'),
  spade: publicAssetUrl('icons/tabler/spade.svg'),
  coin: publicAssetUrl('icons/tabler/coin.svg'),
  star: publicAssetUrl('icons/tabler/star.svg'),
  diamond: publicAssetUrl('icons/tabler/diamond.svg'),
  pokerChip: publicAssetUrl('icons/tabler/poker-chip.svg'),
  gamepad: publicAssetUrl('icons/tabler/device-gamepad-2.svg'),
  building: publicAssetUrl('icons/tabler/building.svg'),
  bank: publicAssetUrl('icons/tabler/building-bank.svg'),
  menu2: publicAssetUrl('icons/tabler/menu-2.svg'),
  menuDeep: publicAssetUrl('icons/tabler/menu-deep.svg'),
  article: publicAssetUrl('icons/tabler/article.svg'),
  cash: publicAssetUrl('icons/tabler/cash.svg'),
  moneybag: publicAssetUrl('icons/tabler/moneybag.svg'),
  carousel: publicAssetUrl('icons/tabler/carousel-horizontal.svg'),
} as const;

const LOGO_MARK = publicAssetUrl('uploads/web.svg');

/** Menu `key` → Tabler icon (prefer over generic web.svg). */
const KEY_ICON_MAP: Record<string, string> = {
  search: STORYBOOK_TABLER.search,
  search_leftmenu: STORYBOOK_TABLER.search,
  wallet: STORYBOOK_TABLER.wallet,
  profile: STORYBOOK_TABLER.user,
  account: STORYBOOK_TABLER.user,
  user: STORYBOOK_TABLER.user,
  notification: STORYBOOK_TABLER.bellRinging,
  bonus_box: STORYBOOK_TABLER.gift,
  bonus: STORYBOOK_TABLER.gift,
  home: STORYBOOK_TABLER.home,
  timer: STORYBOOK_TABLER.flame,
  wheel_mdl: STORYBOOK_TABLER.carousel,
  wheel: STORYBOOK_TABLER.carousel,
  jackpots: STORYBOOK_TABLER.diamond,
  tournaments: STORYBOOK_TABLER.trophy,
  casino: STORYBOOK_TABLER.spade,
  live_games: STORYBOOK_TABLER.dice,
  betting: STORYBOOK_TABLER.cash,
  providers: STORYBOOK_TABLER.building,
  category: STORYBOOK_TABLER.cards,
  promo: STORYBOOK_TABLER.star,
  support: STORYBOOK_TABLER.bell,
  terms: STORYBOOK_TABLER.article,
  sport: STORYBOOK_TABLER.trophy,
  slots: STORYBOOK_TABLER.dice,
  crash: STORYBOOK_TABLER.gamepad,
  live: STORYBOOK_TABLER.dice,
  poker: STORYBOOK_TABLER.pokerChip,
  blackjack: STORYBOOK_TABLER.cards,
  roulette: STORYBOOK_TABLER.diamond,
  baccarat: STORYBOOK_TABLER.spade,
  deposit: STORYBOOK_TABLER.coin,
  sign_in: STORYBOOK_TABLER.user,
  sign_up: STORYBOOK_TABLER.user,
};
const PATH_ICON_RULES: ReadonlyArray<{ test: RegExp; icon: string }> = [
  { test: /search/i, icon: STORYBOOK_TABLER.search },
  { test: /wallet/i, icon: STORYBOOK_TABLER.wallet },
  { test: /user|profile|account/i, icon: STORYBOOK_TABLER.user },
  { test: /bell|notif/i, icon: STORYBOOK_TABLER.bellRinging },
  { test: /gift|bonus/i, icon: STORYBOOK_TABLER.gift },
  { test: /fire|flame|timer/i, icon: STORYBOOK_TABLER.flame },
  { test: /wheel|carousel/i, icon: STORYBOOK_TABLER.carousel },
  { test: /trophy|tournament/i, icon: STORYBOOK_TABLER.trophy },
  { test: /jackpot|diamond/i, icon: STORYBOOK_TABLER.diamond },
  { test: /dice|live/i, icon: STORYBOOK_TABLER.dice },
  { test: /casino|spade|poker/i, icon: STORYBOOK_TABLER.spade },
  { test: /coin|cash|money|deposit/i, icon: STORYBOOK_TABLER.coin },
  { test: /home/i, icon: STORYBOOK_TABLER.home },
  { test: /gamepad|game/i, icon: STORYBOOK_TABLER.gamepad },
  { test: /star|promo/i, icon: STORYBOOK_TABLER.star },
  { test: /icons\/tabler\/menu-deep/i, icon: STORYBOOK_TABLER.menuDeep },
  { test: /icons\/tabler\/menu-2/i, icon: STORYBOOK_TABLER.menu2 },
];

function pickIconFromPath(path: string): string | null {
  for (const rule of PATH_ICON_RULES) {
    if (rule.test.test(path)) return rule.icon;
  }
  return null;
}

/**
 * Map menu `img` to a Tabler (or logo) file under Storybook `public/`.
 * Never collapse every unknown path to the same web.svg globe.
 */
export function resolveStorybookMediaSrc(
  src: string | undefined | null,
  key?: string | null,
): string {
  if (src == null) return '';
  const raw = String(src).trim();
  if (raw.length === 0) return '';

  const path = raw
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/+/, '')
    .replace(/^public\//, '');

  if (path.includes('icons/tabler/')) {
    const file = path.split('/').pop() ?? '';
    return publicAssetUrl(`icons/tabler/${file}`);
  }

  if (key != null && key.length > 0 && KEY_ICON_MAP[key]) {
    return KEY_ICON_MAP[key];
  }

  const fromPath = pickIconFromPath(path);
  if (fromPath) return fromPath;

  if (key === 'logo' || key === 'aside_header_logo' || path.includes('uploads/web')) {
    return LOGO_MARK;
  }

  // Stable but varied fallback from key hash — avoid identical WWW for every row.
  if (key != null && key.length > 0) {
    const pool = [
      STORYBOOK_TABLER.star,
      STORYBOOK_TABLER.cards,
      STORYBOOK_TABLER.spade,
      STORYBOOK_TABLER.dice,
      STORYBOOK_TABLER.coin,
      STORYBOOK_TABLER.gamepad,
      STORYBOOK_TABLER.trophy,
      STORYBOOK_TABLER.diamond,
    ];
    let hash = 0;
    for (let i = 0; i < key.length; i += 1)
      hash = (hash + key.charCodeAt(i) * (i + 1)) % pool.length;
    return pool[hash] ?? STORYBOOK_TABLER.star;
  }

  return STORYBOOK_TABLER.star;
}

/**
 * Coerce mock/API urls into valid AppHref values so Storybook rows are not
 * `disabled` (gray) for query-only / relative paths.
 */
export function resolveStorybookItemUrl(url: string | undefined | null): string {
  if (url == null) return '/';
  const raw = String(url).trim();
  if (raw.length === 0 || raw === '#' || raw === '/#') return '/';
  if (/^https?:\/\//i.test(raw) || raw.startsWith('//')) return '/';
  if (raw.startsWith('?')) return `/search${raw}`;
  if (raw.startsWith('#')) return raw.length > 1 ? raw : '/';
  if (raw.startsWith('/')) return raw;
  return `/${raw.replace(/^\/+/, '')}`;
}

function mapMenuItem(item: HeaderMenuItem): HeaderMenuItem {
  const img = resolveStorybookMediaSrc(item.img, item.key);
  const url = resolveStorybookItemUrl(item.url);
  const items = item.items?.map(mapMenuItem);
  return {
    ...item,
    url,
    ...(img.length > 0 || item.img ? { img } : {}),
    ...(items ? { items } : {}),
  };
}

/** Deep-clone menu with Tabler media + valid hrefs for Storybook demos. */
export function sanitizeStorybookMenu(menu: HeaderMenuModel): HeaderMenuModel {
  return {
    ...menu,
    sections: menu.sections.map((section) => ({
      ...section,
      items: section.items.map(mapMenuItem),
    })),
  };
}
