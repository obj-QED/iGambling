import type { PageData } from './types';

export type BuilderPayload = {
  content?: unknown;
  menu?: unknown;
  slider?: unknown;
};

/** Маппинг данных страницы в payload builder без перезаписи отсутствующих полей. */
export function toBuilderPayload(pageData: PageData): BuilderPayload {
  return {
    ...(pageData.blocks !== undefined ? { content: pageData.blocks } : {}),
    ...(pageData.menu !== undefined ? { menu: pageData.menu } : {}),
    ...(pageData.slider !== undefined ? { slider: pageData.slider } : {}),
  };
}
