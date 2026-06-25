/**
 * Storybook-only data entrypoints.
 * Do not import from app runtime — use fixtures here and pass props in stories.
 */
import { createHeaderMenuFixture } from '@/storybook/fixtures/headerMenu';
import { getHeaderMenuMock } from '@/widgets/header/mocks/getHeaderMenuMock';

/**
 * Header menu for Storybook: same `MENU_HEADER_TOP_MOCK` as dev (`mockMenu: true` in settings).
 */
export function createStorybookHeaderMenu() {
  return getHeaderMenuMock() ?? createHeaderMenuFixture();
}

export { createHeaderMenuFixture, findHeaderMenuItem } from '@/storybook/fixtures/headerMenu';
