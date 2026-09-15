import type { MenuItem, MenuModel, MenuSection } from './types';
import type {
  HeaderCustomBlockConfig,
  HeaderCustomBlockPlacement,
} from '@/shared/config/headerSettings';

import { mapMenuItem } from './mapMenu';

type NormalizedPlacement =
  | { kind: 'in-section'; sectionKey: string; at: 'start' | 'end' | number }
  | { kind: 'new-section'; header: 'start' | 'end' }
  | { kind: 'new-section'; beforeSection: string }
  | { kind: 'new-section'; afterSection: string };

function normalizePlacement(placement: HeaderCustomBlockPlacement): NormalizedPlacement | null {
  if (placement === 'prepend') return { kind: 'new-section', header: 'start' };
  if (placement === 'append') return { kind: 'new-section', header: 'end' };
  if ('section' in placement && 'at' in placement)
    return { kind: 'in-section', sectionKey: placement.section, at: placement.at };
  if ('sectionKey' in placement && 'position' in placement)
    return { kind: 'in-section', sectionKey: placement.sectionKey, at: placement.position };
  if ('beforeSection' in placement)
    return { kind: 'new-section', beforeSection: placement.beforeSection };
  if ('afterSection' in placement)
    return { kind: 'new-section', afterSection: placement.afterSection };
  if ('header' in placement) return { kind: 'new-section', header: placement.header };
  return null;
}

function insertItems(
  items: MenuItem[],
  incoming: MenuItem[],
  at: 'start' | 'end' | number,
): MenuItem[] {
  if (at === 'start') return [...incoming, ...items];
  if (at === 'end') return [...items, ...incoming];
  const index = Math.max(0, Math.min(at, items.length));
  return [...items.slice(0, index), ...incoming, ...items.slice(index)];
}

function insertSection(
  sections: MenuSection[],
  index: number,
  section: MenuSection,
): MenuSection[] {
  return index < 0 ? sections : [...sections.slice(0, index), section, ...sections.slice(index)];
}

export function mergeMenuCustomBlock(
  menu: MenuModel,
  customBlock: HeaderCustomBlockConfig,
): MenuModel {
  const items = customBlock.items.map(mapMenuItem);
  const placement = normalizePlacement(customBlock.placement);
  if (items.length === 0 || placement === null) return menu;
  if (placement.kind === 'in-section') {
    const index = menu.sections.findIndex((section) => section.key === placement.sectionKey);
    if (index === -1)
      return {
        sections: [
          ...menu.sections,
          { key: placement.sectionKey, items: insertItems([], items, placement.at) },
        ],
      };
    return {
      sections: menu.sections.map((section, current) =>
        current === index
          ? { ...section, items: insertItems(section.items, items, placement.at) }
          : section,
      ),
    };
  }
  const section = { key: customBlock.key, items };
  if ('header' in placement)
    return placement.header === 'start'
      ? { sections: [section, ...menu.sections] }
      : { sections: [...menu.sections, section] };
  if ('beforeSection' in placement)
    return {
      sections: insertSection(
        menu.sections,
        menu.sections.findIndex((entry) => entry.key === placement.beforeSection),
        section,
      ),
    };
  return {
    sections: insertSection(
      menu.sections,
      menu.sections.findIndex((entry) => entry.key === placement.afterSection) + 1,
      section,
    ),
  };
}
