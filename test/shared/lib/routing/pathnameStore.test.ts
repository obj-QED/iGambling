import { describe, expect, it } from 'vitest';

import { getPathname, setPathname, subscribePathname } from '@/shared/lib/routing';

describe('pathnameStore', () => {
  it('notifies listeners only when pathname changes', () => {
    setPathname('/a');
    expect(getPathname()).toBe('/a');

    let calls = 0;
    const unsubscribe = subscribePathname(() => {
      calls += 1;
    });

    setPathname('/a');
    expect(calls).toBe(0);

    setPathname('/b');
    expect(calls).toBe(1);
    expect(getPathname()).toBe('/b');

    unsubscribe();
    setPathname('/c');
    expect(calls).toBe(1);
  });
});
