import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  getPageNavSnapshot,
  resetPageNavStoreForTests,
  runGetPageNav,
} from '@/api/lobby/lib/pageNavStore';

vi.mock('@/api/lobby/requests', () => ({
  getPage: vi.fn(),
}));

import { getPage } from '@/api/lobby/requests';

const getPageMock = vi.mocked(getPage);

describe('pageNavStore', () => {
  afterEach(() => {
    resetPageNavStoreForTests();
    getPageMock.mockReset();
  });

  it('POSTs getPage and settles path-scoped data', async () => {
    getPageMock.mockResolvedValue({
      content: {
        page: { url: '/jackpots', info: { title: 'Jackpots' } },
      },
    });

    await runGetPageNav({ language: 'en', page: '/jackpots' });

    expect(getPageMock).toHaveBeenCalledTimes(1);
    expect(getPageMock).toHaveBeenCalledWith(
      expect.objectContaining({ language: 'en', page: '/jackpots' }),
    );
    const snap = getPageNavSnapshot();
    expect(snap.status).toBe('settled');
    expect(snap.path).toBe('/jackpots');
    expect(snap.data).toMatchObject({ url: '/jackpots' });
  });

  it('dedupes concurrent same path callers into one getPage', async () => {
    let resolve!: (value: { content: { page: { url: string } } }) => void;
    getPageMock.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );

    const a = runGetPageNav({ language: 'en', page: '/promo' });
    const b = runGetPageNav({ language: 'en', page: '/promo' });
    resolve({ content: { page: { url: '/promo' } } });
    await Promise.all([a, b]);

    expect(getPageMock).toHaveBeenCalledTimes(1);
  });

  it('fires getPage again on revisit after settle', async () => {
    getPageMock.mockResolvedValue({
      content: { page: { url: '/home' } },
    });

    await runGetPageNav({ language: 'en', page: '/home' });
    await runGetPageNav({ language: 'en', page: '/home' });

    expect(getPageMock).toHaveBeenCalledTimes(2);
  });
});
