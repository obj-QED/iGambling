import type { HeaderMenuModel } from '@/widgets/header/types';
import type { InitV2Content } from '@api/lobby/types';

import { findPageMenuInInit } from '@api/lobby/findPageMenuInInit';

import { mapFlat, mapRoot } from '@/widgets/header/lib/mapMenu';

export type PageMenuExtractMode = 'sections' | 'flat';

/** Reads `page.menu` entry by key. Header/footer use `sections`, sidebar uses `flat`. */
export function extractPageMenuFromInit(
  content: InitV2Content,
  menuKey: string,
  mode: PageMenuExtractMode = 'sections',
): HeaderMenuModel | null {
  const root = findPageMenuInInit(content, menuKey);
  if (root === null) return null;

  if (mode === 'sections') {
    return mapRoot(root);
  }

  return mapFlat(root, menuKey);
}
