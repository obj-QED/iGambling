import type { AppHeaderMenuItem } from '@AppHeader/types/AppHeader.types';

/**
 * Some backends send one synthetic row (`url: "#"`, e.g. `key: "header"`) whose children are the
 * real column blocks (`block1`…`block3`, each `url: "#"` with nested items). Without lifting, the
 * UI renders those blocks as Mantine `Menu` roots and breaks columns, order, and profile dropdown.
 */
export function normalizeAppHeaderMenuSections(menu: AppHeaderMenuItem[]): AppHeaderMenuItem[] {
  if (!Array.isArray(menu) || menu.length !== 1) {
    return menu;
  }

  const [root] = menu;
  const nested = root.items;
  const rootUrl = root.url?.trim() ?? '';

  if (rootUrl !== '#' || !Array.isArray(nested) || nested.length === 0) {
    return menu;
  }

  const allDirectChildrenAreHashColumns = nested.every((child) => (child.url?.trim() ?? '') === '#');

  if (!allDirectChildrenAreHashColumns) {
    return menu;
  }

  return nested;
}

export function getAppHeaderSectionItems(section: AppHeaderMenuItem): AppHeaderMenuItem[] {
  if (Array.isArray(section.items) && section.items.length > 0) {
    return section.items;
  }

  return [section];
}

export function flattenAppHeaderMenuSections(
  sections: AppHeaderMenuItem[] | undefined,
): AppHeaderMenuItem[] {
  if (!Array.isArray(sections) || sections.length === 0) {
    return [];
  }

  return sections.flatMap(getAppHeaderSectionItems);
}
