import type { PageData } from './types';

export type BuilderPayload = {
  content?: unknown;
  menu?: unknown;
  slider?: unknown;
};

/** Маппинг данных страницы в payload builder без перезаписи отсутствующих полей. */
export function toBuilderPayload(pageData: PageData): BuilderPayload {
  const payload: BuilderPayload = {};
  if (pageData.blocks != null) payload.content = pageData.blocks;
  if (pageData.menu != null) payload.menu = pageData.menu;
  if (pageData.slider != null) payload.slider = pageData.slider;
  return payload;
}
