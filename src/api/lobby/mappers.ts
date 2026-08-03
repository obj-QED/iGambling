import type { PageData } from './types';

export type BuilderPayload = {
  content?: unknown;
  menu?: unknown;
  slider?: unknown;
};

/** Маппинг данных страницы в payload builder без перезаписи отсутствующих полей. */
export function toBuilderPayload(pageData: PageData): BuilderPayload {
  return {
    ...(pageData.blocks && { content: pageData.blocks }),
    ...(pageData.menu && { menu: pageData.menu }),
    ...(pageData.slider && { slider: pageData.slider }),
  };
}
