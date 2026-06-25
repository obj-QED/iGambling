import type { InitV2Content } from './types';
import type { PageMenuRootDto } from '@/shared/types/pageMenu';

import { isRecord, readString } from '@/shared/lib/coercion';
import { parsePageMenuRootDto } from '@/shared/lib/pageMenu';

/** Finds and parses `page.menu` entry by key from init content. */
export function findPageMenuInInit(
  content: InitV2Content,
  menuKey: string,
): PageMenuRootDto | null {
  const page = content.page;
  if (!isRecord(page) || !Array.isArray(page.menu)) return null;

  for (const entry of page.menu) {
    if (!isRecord(entry)) continue;
    if (readString(entry.key) !== menuKey) continue;
    return parsePageMenuRootDto(entry);
  }

  return null;
}
