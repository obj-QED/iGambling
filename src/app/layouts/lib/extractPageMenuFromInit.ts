import type { MenuModel as HeaderMenuModel } from '@/entities/menu';
import type { InitV2Content } from '@api/lobby/types';

import { findMenuRootInInit } from '@api/lobby/findPageMenuInInit';

import { mapFlatMenu, mapMenuRoot } from '@/entities/menu';

export type MenuExtractMode = 'sections' | 'flat';

/** @deprecated Use `MenuExtractMode`. */
export type PageMenuExtractMode = MenuExtractMode;

/** Reads `page.menu` entry by key. Header/footer use `sections`, sidebar uses `flat`. */
export function extractMenuFromInit(
  content: InitV2Content,
  menuKey: string,
  mode: MenuExtractMode = 'sections',
): HeaderMenuModel | null {
  const root = findMenuRootInInit(content, menuKey);
  if (root === null) return null;

  if (mode === 'sections') {
    return mapMenuRoot(root);
  }

  return mapFlatMenu(root, menuKey);
}

/** @deprecated Use `extractMenuFromInit`. */
export const extractPageMenuFromInit = extractMenuFromInit;
