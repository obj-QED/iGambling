import type { PageMenuItemDto, PageMenuRootDto } from '@/shared/types/pageMenu';

import { isHeaderSpecialBlockKey } from '@/shared/config/headerSpecialBlockKeys';
import { pageMenuItemDtoSchema, pageMenuRootDtoSchema } from '@/shared/schemas/pageMenu.schema';

import { isRecord, readString } from '../coercion';

function resolveMenuItemType(raw: unknown): PageMenuItemDto['type'] | undefined {
  if (raw === null || raw === undefined) return undefined;

  const trimmed = readString(raw).trim();
  if (trimmed === 'button' || trimmed === 'link') return trimmed;

  return undefined;
}

function coercePageMenuItem(raw: unknown): PageMenuItemDto | null {
  if (!isRecord(raw)) return null;

  const key = readString(raw.key).trim();
  if (key.length === 0) return null;

  const name = readString(raw.name);
  const url = readString(raw.url);
  const imgRaw = readString(raw.img).trim();
  const img = imgRaw.length > 0 ? imgRaw : undefined;
  const type = isHeaderSpecialBlockKey(key) === true ? undefined : resolveMenuItemType(raw.type);

  const nestedRaw = raw.items;
  let items: PageMenuItemDto[] | undefined;

  if (Array.isArray(nestedRaw)) {
    const nested: PageMenuItemDto[] = [];
    for (const child of nestedRaw) {
      const parsed = parsePageMenuItemDto(child);
      if (parsed !== null) nested.push(parsed);
    }
    if (nested.length > 0) items = nested;
  }

  const coerced: PageMenuItemDto = { key, name, url, img, type, items };
  const result = pageMenuItemDtoSchema.safeParse(coerced);
  return result.success ? result.data : null;
}

/** Parses unknown backend menu item through coerce + Zod validation. */
export function parsePageMenuItemDto(raw: unknown): PageMenuItemDto | null {
  return coercePageMenuItem(raw);
}

/** Parses unknown backend menu root through coerce + Zod validation. */
export function parsePageMenuRootDto(raw: unknown): PageMenuRootDto | null {
  if (!isRecord(raw)) return null;

  const key = readString(raw.key).trim();
  if (key.length === 0) return null;

  const name = readString(raw.name);
  const url = readString(raw.url);
  const itemsRaw = raw.items;
  if (!Array.isArray(itemsRaw)) return null;

  const items: PageMenuItemDto[] = [];
  for (const entry of itemsRaw) {
    const parsed = parsePageMenuItemDto(entry);
    if (parsed !== null) items.push(parsed);
  }

  const coerced: PageMenuRootDto = { key, name, url, items };
  const result = pageMenuRootDtoSchema.safeParse(coerced);
  return result.success ? result.data : null;
}
