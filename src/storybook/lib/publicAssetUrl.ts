import { publicAssetUrl } from '@/shared/lib/publicAssetUrl';

import { STORYBOOK_TABLER } from './sanitizeMenuMedia';

/** @deprecated Prefer `publicAssetUrl` from `@/shared/lib/publicAssetUrl`. */
export const storybookPublicUrl = publicAssetUrl;

/** Brand mark (logo) — not a menu glyph. */
export const STORYBOOK_DEMO_LOGO = publicAssetUrl('uploads/web.svg');
/** @deprecated Prefer key-specific Tabler icons via `STORYBOOK_TABLER` / sanitize. */
export const STORYBOOK_DEMO_ICON = STORYBOOK_TABLER.gift;
export const STORYBOOK_DEMO_SVG = STORYBOOK_DEMO_LOGO;

export const STORYBOOK_TABLER_SEARCH = STORYBOOK_TABLER.search;
export const STORYBOOK_TABLER_WALLET = STORYBOOK_TABLER.wallet;
export const STORYBOOK_TABLER_USER = STORYBOOK_TABLER.user;
export const STORYBOOK_TABLER_GIFT = STORYBOOK_TABLER.gift;
export const STORYBOOK_TABLER_BELL = STORYBOOK_TABLER.bellRinging;
export const STORYBOOK_TABLER_HOME = STORYBOOK_TABLER.home;
export const STORYBOOK_TABLER_FLAME = STORYBOOK_TABLER.flame;

export { STORYBOOK_TABLER };
