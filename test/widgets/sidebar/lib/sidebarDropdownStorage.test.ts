import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  readSidebarDropdownOpenKeys,
  toggleSidebarDropdownOpenKey,
  writeSidebarDropdownOpenKeys,
} from '@/widgets/sidebar/lib';

const STORAGE_KEY = 'igambling:sidebar:dropdown-open-keys';

describe('sidebarDropdownStorage', () => {
  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    vi.restoreAllMocks();
  });

  it('seeds from defaults when storage is missing', () => {
    expect(readSidebarDropdownOpenKeys(['category', 'casino'])).toEqual(
      new Set(['category', 'casino']),
    );
  });

  it('returns empty set when storage is empty array', () => {
    writeSidebarDropdownOpenKeys(new Set());
    expect(readSidebarDropdownOpenKeys(['category'])).toEqual(new Set());
  });

  it('round-trips open keys', () => {
    writeSidebarDropdownOpenKeys(new Set(['sport', 'casino']));
    expect(readSidebarDropdownOpenKeys(['category'])).toEqual(new Set(['sport', 'casino']));
  });

  it('ignores invalid JSON and falls back to defaults', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not-json');
    expect(readSidebarDropdownOpenKeys(['category'])).toEqual(new Set(['category']));
  });

  it('toggles keys immutably', () => {
    const opened = toggleSidebarDropdownOpenKey(new Set(['sport']), 'casino');
    expect(opened).toEqual(new Set(['sport', 'casino']));

    const closed = toggleSidebarDropdownOpenKey(opened, 'sport');
    expect(closed).toEqual(new Set(['casino']));
  });
});
