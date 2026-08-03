import type { InitV2Content } from './types';
import type { MenuRootDto } from '@/shared/types/menu';

import { isRecord, readString } from '@/shared/lib/coercion';
import { parseMenuRootDto } from '@/shared/lib/menu';

/** Finds and parses `page.menu` entry by key from init content. */
export function findMenuRootInInit(content: InitV2Content, menuKey: string): MenuRootDto | null {
  const page = content.page;
  if (!isRecord(page) || !Array.isArray(page.menu)) return null;

  for (const entry of page.menu) {
    if (!isRecord(entry)) continue;
    if (readString(entry.key) !== menuKey) continue;
    return parseMenuRootDto(entry);
  }

  return null;
}

/** @deprecated Use `findMenuRootInInit`. */
export const findPageMenuInInit = findMenuRootInInit;
