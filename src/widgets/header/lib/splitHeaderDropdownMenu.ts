import type { HeaderMenuItem, HeaderMenuModel, HeaderSection } from '../types';

import { HEADER_DROPDOWN_OUTSIDE_KEYS } from '@/shared/config';

import { isDeepPanelItemEligible } from './itemUtils';

const OUTSIDE_KEY_SET = new Set<string>(HEADER_DROPDOWN_OUTSIDE_KEYS);

export function isHeaderDropdownOutsideKey(key: string | undefined): boolean {
  return OUTSIDE_KEY_SET.has(key ?? '');
}

/** Leaf rows for deep menu — skips specials; does not promote parents to buttons. */
export function flattenHeaderDropdownItems(items: readonly HeaderMenuItem[]): HeaderMenuItem[] {
  const result: HeaderMenuItem[] = [];

  for (const item of items) {
    if (isHeaderDropdownOutsideKey(item.key)) continue;

    const nested = item.items;
    if (nested !== undefined && nested.length > 0) {
      result.push(...flattenHeaderDropdownItems(nested));
      continue;
    }

    if (isDeepPanelItemEligible(item)) {
      result.push(item);
    }
  }

  return result;
}

/** Specials at any depth → flat list for the mobile outside bar. */
export function collectHeaderDropdownOutsideItems(
  items: readonly HeaderMenuItem[],
): HeaderMenuItem[] {
  const result: HeaderMenuItem[] = [];

  for (const item of items) {
    if (isHeaderDropdownOutsideKey(item.key)) {
      result.push({ ...item, items: undefined });
      continue;
    }

    const nested = item.items;
    if (nested !== undefined && nested.length > 0) {
      result.push(...collectHeaderDropdownOutsideItems(nested));
    }
  }

  return result;
}

export type HeaderDeepPanelGroup = {
  key: string;
  /** Section label (`block3`, `block1`, …). */
  label: string;
  items: HeaderMenuItem[];
};

export type HeaderDropdownMenuSplit = {
  /** Sections containing only outside specials (logo, search, color_scheme, …). */
  outsideMenu: HeaderMenuModel;
  /** Grouped deep-menu rows — `Menu.Label` + AppButton items. */
  dropdownGroups: HeaderDeepPanelGroup[];
};

export function splitHeaderDropdownMenu(menu: HeaderMenuModel): HeaderDropdownMenuSplit {
  const outsideSections: HeaderSection[] = [];
  const dropdownGroups: HeaderDeepPanelGroup[] = [];

  for (const section of menu.sections) {
    const outsideItems = collectHeaderDropdownOutsideItems(section.items);
    if (outsideItems.length > 0) {
      outsideSections.push({ ...section, items: outsideItems });
    }

    const leaves = flattenHeaderDropdownItems(section.items);
    if (leaves.length > 0) {
      dropdownGroups.push({
        key: section.key,
        label: section.key,
        items: leaves,
      });
    }
  }

  return {
    outsideMenu: { sections: outsideSections },
    dropdownGroups,
  };
}
