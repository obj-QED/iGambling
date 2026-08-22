import { describe, expect, it } from 'vitest';

import { lockSidebarWidth } from '@/app/layouts/AppLayout/lockSidebarWidth';

describe('lockSidebarWidth', () => {
  it('writes a used-width lock onto the sidebar once', () => {
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
    expect(aside.style.width).toBe('240px');
    expect(aside.style.minWidth).toBe('240px');
    expect(aside.style.maxWidth).toBe('240px');
  });

  it('skips when the sidebar has no used width', () => {
    const root = document.createElement('div');
    const aside = document.createElement('aside');
    aside.setAttribute('data-widget', 'sidebar');
    root.append(aside);

    lockSidebarWidth(root);

    expect(aside.dataset.shellBoxLock).toBeUndefined();
    expect(aside.style.width).toBe('');
  });
});
