import type { HeaderMenuItem, HeaderMenuModel } from '@/widgets/header/types';

import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

const LOCAL_SVG = publicAssetUrl('uploads/web.svg');
const LOCAL_ICONS = {
  search: publicAssetUrl('icons/tabler/search.svg'),
  wallet: publicAssetUrl('icons/tabler/wallet.svg'),
  user: publicAssetUrl('icons/tabler/user.svg'),
} as const;

/**
 * Map menu `img` to a file that exists under Storybook `public/`.
 * Prefer SVG — faster decode than many webp clones (audit false “broken”).
 */
export function resolveStorybookMediaSrc(src: string | undefined | null): string {
  if (src == null) return '';
  const raw = String(src).trim();
  if (raw.length === 0) return '';

  const path = raw
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/+/, '')
    .replace(/^public\//, '');

  if (path.includes('icons/tabler/search')) return LOCAL_ICONS.search;
  if (path.includes('icons/tabler/wallet')) return LOCAL_ICONS.wallet;
  if (path.includes('icons/tabler/user')) return LOCAL_ICONS.user;
  if (path.includes('uploads/web')) return LOCAL_SVG;
  return LOCAL_SVG;
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
  const img = resolveStorybookMediaSrc(item.img);
  const url = resolveStorybookItemUrl(item.url);
  const items = item.items?.map(mapMenuItem);
  return {
    ...item,
    url,
    ...(img.length > 0 || item.img ? { img } : {}),
    ...(items ? { items } : {}),
  };
}

/** Deep-clone menu with local-only media + valid hrefs for Storybook demos. */
export function sanitizeStorybookMenu(menu: HeaderMenuModel): HeaderMenuModel {
  return {
    ...menu,
    sections: menu.sections.map((section) => ({
      ...section,
      items: section.items.map(mapMenuItem),
    })),
  };
}
