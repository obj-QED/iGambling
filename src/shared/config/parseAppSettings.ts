import type { AppSettings } from './settings';

import { z } from 'zod';

import { isRecord } from '@/shared/lib/coercion';

/** Loose settings contract — unknown keys pass through (blockVariants, customBlocks, …). */
const appSettingsSchema = z
  .object({
    language: z.string().optional(),
    params: z
      .object({
        language: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export function parseAppSettings(raw: unknown): AppSettings {
  if (!isRecord(raw)) return {};
  const parsed = appSettingsSchema.safeParse(raw);
  if (!parsed.success) return {};
  return parsed.data as AppSettings;
}
