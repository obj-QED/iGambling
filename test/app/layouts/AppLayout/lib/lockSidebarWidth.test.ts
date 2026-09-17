import { describe, expect, it } from 'vitest';

import { lockSidebarWidth, unlockSidebarWidth } from '@/app/layouts/AppLayout/lib/lockSidebarWidth';

describe('lockSidebarWidth', () => {
  it('writes a used-width lock onto the sidebar CSS token once', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    Object.defineProperty(aside, 'getBoundingClientRect', {
      value: () => ({ width: 240, height: 800, top: 0, left: 0, bottom: 800, right: 240 }),
    });
    root.append(aside);

    lockSidebarWidth(root);
    lockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBe('true');
    expect(aside.style.getPropertyValue('--app-layout-sidebar-width')).toBe('240px');
    expect(aside.style.width).toBe('');
    expect(aside.style.minWidth).toBe('');
    expect(aside.style.maxWidth).toBe('');
  });

  it('skips when the sidebar has no used width', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    root.append(aside);

    lockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBeUndefined();
    expect(aside.style.getPropertyValue('--app-layout-sidebar-width')).toBe('');
  });

  it('skips slideout so width can animate', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    aside.setAttribute('data-type', 'slideout');
    Object.defineProperty(aside, 'getBoundingClientRect', {
      value: () => ({ width: 72, height: 800, top: 0, left: 0, bottom: 800, right: 72 }),
    });
    root.append(aside);

    lockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBeUndefined();
    expect(aside.style.getPropertyValue('--app-layout-sidebar-width')).toBe('');
  });

  it('skips slidein so width can animate', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    aside.setAttribute('data-type', 'slidein');
    Object.defineProperty(aside, 'getBoundingClientRect', {
      value: () => ({ width: 72, height: 800, top: 0, left: 0, bottom: 800, right: 72 }),
    });
    root.append(aside);

    lockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBeUndefined();
    expect(aside.style.getPropertyValue('--app-layout-sidebar-width')).toBe('');
  });

  it('unlock clears the token freeze and legacy px locks', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    aside.dataset.shellBoxLock = 'true';
    aside.style.setProperty('--app-layout-sidebar-width', '240px');
    aside.style.width = '240px';
    aside.style.minWidth = '240px';
    aside.style.maxWidth = '240px';
    root.append(aside);

    unlockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBeUndefined();
    expect(aside.style.getPropertyValue('--app-layout-sidebar-width')).toBe('');
    expect(aside.style.width).toBe('');
    expect(aside.style.minWidth).toBe('');
    expect(aside.style.maxWidth).toBe('');
  });
});
