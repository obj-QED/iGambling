import type { HeaderMenuModel } from '@/widgets/header/types';
import type { InitV2Content } from '@api/lobby/types';

import { findMenuRootInInit } from '@api/lobby/findPageMenuInInit';

import { mapFlat, mapRoot } from '@/widgets/header/lib/mapMenu';

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
    return mapRoot(root);
  }

  return mapFlat(root, menuKey);
}

/** @deprecated Use `extractMenuFromInit`. */
export const extractPageMenuFromInit = extractMenuFromInit;
