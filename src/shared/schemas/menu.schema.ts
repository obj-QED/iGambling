import type { MenuItemDto, MenuRootDto } from '@/shared/types/menu';

import { z } from 'zod';

/** API menu DTO — strings pass through as backend sends them (no trim/transform). */
export const menuItemDtoSchema: z.ZodType<MenuItemDto> = z.lazy(() =>
  z.object({
    key: z.string().min(1),
    name: z.string(),
    url: z.string(),
    img: z.string().optional(),
    imgShape: z.string().optional(),
    imgRadius: z.string().optional(),
    type: z.string().optional(),
    items: z.array(menuItemDtoSchema).min(1).optional(),
  }),
);

export const menuRootDtoSchema = z.object({
  key: z.string().min(1),
  name: z.string(),
  url: z.string(),
  items: z.array(menuItemDtoSchema),
}) satisfies z.ZodType<MenuRootDto>;

export type MenuItemDtoInput = z.input<typeof menuItemDtoSchema>;
export type MenuRootDtoInput = z.input<typeof menuRootDtoSchema>;
