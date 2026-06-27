/**
 * Storybook-only data entrypoints.
 * Do not import from app runtime — use fixtures here and pass props in stories.
 */
import { createHeaderMenuFixture } from '@/storybook/fixtures/headerMenu';
import { getHeaderMenuMock } from '@/widgets/header/mocks/getHeaderMenuMock';

/**
 * Header menu for Storybook — always from `widgets/header/mocks`;
 * session variant via toolbar **Header session** → `header.mockAuth`.
 */
export function createStorybookHeaderMenu() {
  return getHeaderMenuMock() ?? createHeaderMenuFixture();
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
