/**
 * Storybook-only data entrypoints.
 * Do not import from app runtime — use fixtures here and pass props in stories.
 */
import {
  createEmptyHeaderMenuFixture,
  createHeaderMenuFixture,
} from '@/storybook/fixtures/headerMenu';
import { getHeaderMenuMock } from '@/widgets/header/mocks/getHeaderMenuMock';

/**
 * Header menu for Storybook — respects `window.__SETTINGS__.header.mockMenu`
 * (set via toolbar + `withAppSettings` before each story).
 */
export function createStorybookHeaderMenu() {
  const mockMenu = getHeaderMenuMock();
  if (mockMenu !== null) return mockMenu;

  return createEmptyHeaderMenuFixture();
}

/** Explicit full mock fixture (toolbar-independent), e.g. isolated menu control demos. */
export function createStorybookHeaderMenuFixture() {
  return createHeaderMenuFixture();
}

export {
  createEmptyHeaderMenuFixture,
  createHeaderMenuFixture,
  findHeaderMenuItem,
} from '@/storybook/fixtures/headerMenu';
