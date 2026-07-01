import type { PageMenuItemDto, PageMenuRootDto } from '@/shared/types/pageMenu';

import { isHeaderSpecialBlockKey } from '@/shared/config/headerSpecialBlockKeys';
import { pageMenuItemDtoSchema, pageMenuRootDtoSchema } from '@/shared/schemas/pageMenu.schema';

import { cleanApiPayload, isRecord, readString } from '../coercion';

function readRecordField(raw: Record<string, unknown>, key: string): string | undefined {
  if (!(key in raw) || raw[key] === null || raw[key] === undefined) return undefined;
  return readString(raw[key]);
}

function coercePageMenuItem(raw: unknown): PageMenuItemDto | null {
  const cleaned = cleanApiPayload(raw);
  if (!isRecord(cleaned)) return null;

  const key = readString(cleaned.key);
  if (key.length === 0) return null;

  const name = readString(cleaned.name);
  const url = readString(cleaned.url);
  const img = readRecordField(cleaned, 'img');
  const imgShape = readRecordField(cleaned, 'imgShape') ?? readRecordField(cleaned, 'img_shape');
  const imgRadius = readRecordField(cleaned, 'imgRadius') ?? readRecordField(cleaned, 'img_radius');
  const typeRaw = readRecordField(cleaned, 'type');
  const type =
    isHeaderSpecialBlockKey(key) === true
      ? undefined
      : typeRaw !== undefined && typeRaw.length > 0
        ? typeRaw
        : undefined;

  const nestedRaw = cleaned.items;
  let items: PageMenuItemDto[] | undefined;

  if (Array.isArray(nestedRaw)) {
    const nested: PageMenuItemDto[] = [];
    for (const child of nestedRaw) {
      const parsed = parsePageMenuItemDto(child);
      if (parsed !== null) nested.push(parsed);
    }
    if (nested.length > 0) items = nested;
  }

  const coerced: PageMenuItemDto = { key, name, url, img, imgShape, imgRadius, type, items };
  const result = pageMenuItemDtoSchema.safeParse(coerced);
  return result.success ? result.data : null;
}

/** Parses unknown backend menu item — clean API noise, then Zod validation. */
export function parsePageMenuItemDto(raw: unknown): PageMenuItemDto | null {
  return coercePageMenuItem(raw);
}

/** Parses unknown backend menu root — clean API noise, then Zod validation. */
export function parsePageMenuRootDto(raw: unknown): PageMenuRootDto | null {
  const cleaned = cleanApiPayload(raw);
  if (!isRecord(cleaned)) return null;

  const key = readString(cleaned.key);
  if (key.length === 0) return null;

  const name = readString(cleaned.name);
  const url = readString(cleaned.url);
  const itemsRaw = cleaned.items;
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
