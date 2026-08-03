import { describe, expect, it } from 'vitest';

import { cleanApiPayload } from '@/shared/lib/coercion/cleanApiPayload';

describe('cleanApiPayload', () => {
  it('removes undefined, empty string, empty array, empty object', () => {
    const missing: unknown = undefined;
    expect(cleanApiPayload(missing)).toBeUndefined();
    expect(cleanApiPayload('')).toBeUndefined();
    expect(cleanApiPayload([])).toBeUndefined();
    expect(cleanApiPayload({})).toBeUndefined();
  });

  it('keeps null and non-empty values as-is', () => {
    expect(cleanApiPayload(null)).toBeNull();
    expect(cleanApiPayload('/games')).toBe('/games');
    expect(cleanApiPayload(' Search ')).toBe(' Search ');
    expect(cleanApiPayload(0)).toBe(0);
    expect(cleanApiPayload(false)).toBe(false);
  });

  it('cleans nested objects and arrays recursively', () => {
    expect(
      cleanApiPayload({
        key: 'home',
        name: '',
        url: '/',
        img: undefined,
        meta: {},
        items: [{ key: 'child', name: '', url: '/child' }, null, '', {}],
      }),
    ).toEqual({
      key: 'home',
      url: '/',
      items: [{ key: 'child', url: '/child' }, null],
    });
  });

  it('drops empty arrays after cleaning children', () => {
    expect(cleanApiPayload({ items: ['', undefined, {}] })).toBeUndefined();
    expect(cleanApiPayload({ items: [{ key: 'x', url: '' }] })).toEqual({ items: [{ key: 'x' }] });
  });
});
