import type { AppBannerModel, AppBannerSlide } from '../types';
import type { InitV2Content } from '@api/lobby/types';

import { isRecord } from '@/shared/lib/coercion';

function readString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizeSlide(raw: unknown): AppBannerSlide | null {
  if (!isRecord(raw)) return null;

  const background = readString(raw.background);
  const text = readString(raw.text);
  const url = readString(raw.url);

  return {
    background: background.length > 0 ? background : undefined,
    text: text.length > 0 ? text : undefined,
    url: url.length > 0 ? url : undefined,
  };
}

function normalizeSlides(raw: unknown): AppBannerSlide[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => normalizeSlide(entry))
    .filter((slide): slide is AppBannerSlide => slide !== null);
}

/** Reads banner slides from `page.slider` or first `page.blocks` item with `type: "slider"`. */
export function extractBannerFromInit(content: InitV2Content): AppBannerModel | null {
  const page = content.page;
  if (!isRecord(page)) return null;

  const sliderSlides = normalizeSlides(page.slider);
  if (sliderSlides.length > 0) {
    return { slides: sliderSlides };
  }

  const blocks = page.blocks;
  if (!Array.isArray(blocks)) return null;

  for (const block of blocks) {
    if (!isRecord(block)) continue;
    if (readString(block.type) !== 'slider') continue;

    const slides = normalizeSlides(block.slides);
    if (slides.length > 0) return { slides };
  }

  return null;
}
