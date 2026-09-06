import { describe, expect, it } from 'vitest';

import { createSidebarDropdownOpenKeysStore } from '@/widgets/sidebar/lib/dropdown/sidebarDropdownOpenKeysStore';

describe('createSidebarDropdownOpenKeysStore', () => {
  it('notifies listeners only when the toggled key flips for a filtered subscriber', () => {
    const store = createSidebarDropdownOpenKeysStore(['a']);

    let aCalls = 0;
    let bCalls = 0;
    let prevA = store.getOpenKeys().has('a');
    let prevB = store.getOpenKeys().has('b');

    const unsubA = store.subscribe(() => {
      const next = store.getOpenKeys().has('a');
      if (next === prevA) return;
      prevA = next;
      aCalls += 1;
    });
    const unsubB = store.subscribe(() => {
      const next = store.getOpenKeys().has('b');
      if (next === prevB) return;
      prevB = next;
      bCalls += 1;
    });

    store.toggle('b');
    expect(aCalls).toBe(0);
    expect(bCalls).toBe(1);
    expect(store.getOpenKeys().has('b')).toBe(true);

    store.toggle('a');
    expect(aCalls).toBe(1);
    expect(bCalls).toBe(1);

    unsubA();
    unsubB();
  });
});
