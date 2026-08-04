/**
 * Storybook-only data entrypoints.
 * Do not import from app runtime — use fixtures here and pass props in stories.
 */
import { createHeaderMenuFixture } from '@/storybook/fixtures/headerMenu';
import { sanitizeStorybookMenu } from '@/storybook/lib/sanitizeMenuMedia';
import { getHeaderMenuMock } from '@/widgets/header/mocks/getHeaderMenuMock';
import { getSidebarMenuMock } from '@/widgets/sidebar/mocks/getSidebarMenuMock';
import { SIDEBAR_MENU_MOCK } from '@/widgets/sidebar/mocks/sidebarMenu.mock';

/**
 * Header menu for Storybook — always from `widgets/header/mocks`;
 * session variant via toolbar **Header session** → `header.mockAuth`.
 */
export function createStorybookHeaderMenu() {
  const menu = getHeaderMenuMock() ?? createHeaderMenuFixture();
  return sanitizeStorybookMenu(menu);
}

/** Explicit full mock fixture (toolbar-independent), e.g. isolated menu control demos. */
export function createStorybookHeaderMenuFixture() {
  return sanitizeStorybookMenu(createHeaderMenuFixture());
}

/**
 * Sidebar menu for Storybook — from `widgets/sidebar/mocks` when toolbar **Aside mock menu** is on.
 */
export function createStorybookSidebarMenu() {
  const menu = getSidebarMenuMock() ?? SIDEBAR_MENU_MOCK;
  return sanitizeStorybookMenu(menu);
}

export {
  createEmptyHeaderMenuFixture,
  createHeaderMenuFixture,
  findHeaderMenuItem,
} from '@/storybook/fixtures/headerMenu';
