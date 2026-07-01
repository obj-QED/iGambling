import type { PageMenuItemDto, PageMenuRootDto } from '@/shared/types/pageMenu';

import { z } from 'zod';

/** API menu DTO — strings pass through as backend sends them (no trim/transform). */
export const pageMenuItemDtoSchema: z.ZodType<PageMenuItemDto> = z.lazy(() =>
  z.object({
    key: z.string().min(1),
    name: z.string(),
    url: z.string(),
    img: z.string().optional(),
    imgShape: z.string().optional(),
    imgRadius: z.string().optional(),
    type: z.string().optional(),
    items: z.array(pageMenuItemDtoSchema).min(1).optional(),
  }),
);

export const pageMenuRootDtoSchema = z.object({
  key: z.string().min(1),
  name: z.string(),
  url: z.string(),
  items: z.array(pageMenuItemDtoSchema),
}) satisfies z.ZodType<PageMenuRootDto>;

export type PageMenuItemDtoInput = z.input<typeof pageMenuItemDtoSchema>;
export type PageMenuRootDtoInput = z.input<typeof pageMenuRootDtoSchema>;
