import type { MenuItemDto, MenuRootDto } from '@/shared/types/menu';

import { menuItemDtoSchema, menuRootDtoSchema } from '@/shared/schemas/menu.schema';

import { cleanApiPayload, isRecord, readString } from '../coercion';

function readRecordField(raw: Record<string, unknown>, key: string): string | undefined {
  if (!(key in raw) || raw[key] === null || raw[key] === undefined) return undefined;
  return readString(raw[key]);
}

function coerceMenuItem(raw: unknown): MenuItemDto | null {
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
  const type = typeRaw !== undefined && typeRaw.length > 0 ? typeRaw : undefined;

  const variantRaw = readRecordField(cleaned, 'variant');
  const variant = variantRaw !== undefined && variantRaw.length > 0 ? variantRaw : undefined;

  const labelRaw = readRecordField(cleaned, 'label');
  const label = labelRaw !== undefined && labelRaw.length > 0 ? labelRaw : undefined;

  const subtitleRaw = readRecordField(cleaned, 'subtitle');
  const subtitle = subtitleRaw !== undefined && subtitleRaw.length > 0 ? subtitleRaw : undefined;

  const badgeRaw = cleaned.badge;
  const badge = typeof badgeRaw === 'string' || typeof badgeRaw === 'number' ? badgeRaw : undefined;

  const nestedRaw = cleaned.items;
  let items: MenuItemDto[] | undefined;

  if (Array.isArray(nestedRaw)) {
    const nested: MenuItemDto[] = [];
    for (const child of nestedRaw) {
      const parsed = parseMenuItemDto(child);
      if (parsed !== null) nested.push(parsed);
    }
    if (nested.length > 0) items = nested;
  }

  const coerced: MenuItemDto = {
    key,
    name,
    url,
    img,
    imgShape,
    imgRadius,
    type,
    variant,
    label,
    subtitle,
    badge,
    items,
  };

  if (cleaned.menuIcon === true) {
    coerced.menuIcon = true;
  }

  const result = menuItemDtoSchema.safeParse(coerced);
  return result.success ? result.data : null;
}

/** Parses unknown backend menu item — clean API noise, then Zod validation. */
export function parseMenuItemDto(raw: unknown): MenuItemDto | null {
  return coerceMenuItem(raw);
}

/** Parses unknown backend menu root — clean API noise, then Zod validation. */
export function parseMenuRootDto(raw: unknown): MenuRootDto | null {
  const cleaned = cleanApiPayload(raw);
  if (!isRecord(cleaned)) return null;

  const key = readString(cleaned.key);
  if (key.length === 0) return null;

  const name = readString(cleaned.name);
  const url = readString(cleaned.url);
  const itemsRaw = cleaned.items;
  if (!Array.isArray(itemsRaw)) return null;

  const items: MenuItemDto[] = [];
  for (const entry of itemsRaw) {
    const parsed = parseMenuItemDto(entry);
    if (parsed !== null) items.push(parsed);
  }

  const coerced: MenuRootDto = { key, name, url, items };
  const result = menuRootDtoSchema.safeParse(coerced);
  return result.success ? result.data : null;
}
