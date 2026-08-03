import type { PageData } from './types';

import { isRecord } from '@shared/lib';

export function sanitizeHtml(value: string): string {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

export function sanitizeInfo(value: unknown): unknown {
  if (!isRecord(value)) return value;
  const content = value.content;
  if (typeof content !== 'string') return value;
  return { ...value, content: sanitizeHtml(content) };
}

export function sanitizePageData(pageData: PageData | undefined): PageData | undefined {
  if (pageData === undefined) return pageData;
  return {
    ...pageData,
    info: sanitizeInfo(pageData.info),
  };
}

export function toPageData(value: unknown): PageData | undefined {
  if (!isRecord(value)) return undefined;
  return { ...value };
}
