import type {
  HeaderCustomBlockConfig,
  HeaderMenuItem,
  HeaderMenuModel,
  HeaderSection,
} from '../types';

import { mapItem } from './mapMenu';
import { normalizeCustomBlockPlacement } from './normalizePlacement';

function insertSectionAt(
  sections: HeaderSection[],
  index: number,
  section: HeaderSection,
): HeaderSection[] {
  if (index < 0) return sections;

  return [...sections.slice(0, index), section, ...sections.slice(index)];
}

function insertItemsAt(
  items: HeaderMenuItem[],
  incoming: HeaderMenuItem[],
  at: 'start' | 'end' | number,
): HeaderMenuItem[] {
  if (at === 'start') return [...incoming, ...items];
  if (at === 'end') return [...items, ...incoming];

  const index = Math.max(0, Math.min(at, items.length));
  return [...items.slice(0, index), ...incoming, ...items.slice(index)];
}

function mergeInSectionItems(
  menu: HeaderMenuModel,
  sectionKey: string,
  at: 'start' | 'end' | number,
  items: HeaderSection['items'],
): HeaderMenuModel {
  const sectionIndex = menu.sections.findIndex((existing) => existing.key === sectionKey);
  if (sectionIndex === -1) return menu;

  const sections = menu.sections.map((existing, index) => {
    if (index !== sectionIndex) return existing;

    return { ...existing, items: insertItemsAt(existing.items, items, at) };
  });

  return { sections };
}

export function mergeCustomBlock(
  menu: HeaderMenuModel,
  customBlock: HeaderCustomBlockConfig,
): HeaderMenuModel {
  const items = customBlock.items.map((entry) => mapItem(entry));

  if (items.length === 0) return menu;

  const normalized = normalizeCustomBlockPlacement(customBlock.placement);
  if (normalized === null) return menu;

  if (normalized.kind === 'in-section') {
    return mergeInSectionItems(menu, normalized.sectionKey, normalized.at, items);
  }

  const section = { key: customBlock.key, items };

  if ('header' in normalized) {
    return normalized.header === 'start'
      ? { sections: [section, ...menu.sections] }
      : { sections: [...menu.sections, section] };
  }

  if ('beforeSection' in normalized) {
    const index = menu.sections.findIndex((entry) => entry.key === normalized.beforeSection);
    if (index === -1) return menu;

    return { sections: insertSectionAt(menu.sections, index, section) };
  }

  const index = menu.sections.findIndex((entry) => entry.key === normalized.afterSection);
  if (index === -1) return menu;

  return { sections: insertSectionAt(menu.sections, index + 1, section) };
}

/** Applies custom header sections in config order. */
export function mergeCustomBlocks(
  menu: HeaderMenuModel,
  customBlocks: HeaderCustomBlockConfig[] | undefined,
): HeaderMenuModel {
  if (customBlocks === undefined || customBlocks.length === 0) return menu;

  return customBlocks.reduce(
    (mergedMenu, customBlock) => mergeCustomBlock(mergedMenu, customBlock),
    menu,
  );
}
