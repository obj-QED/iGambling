import { beforeEach, describe, expect, it, vi } from 'vitest';

import { lobbyApiClient } from '@api/baseApi';

import { getPage } from '@/api/lobby/requests';

vi.mock('@api/baseApi', () => ({
  lobbyApiClient: {
    post: vi.fn(),
  },
}));

const mockedPost = vi.mocked(lobbyApiClient.post);

describe('getPage wire body', () => {
  beforeEach(() => {
    mockedPost.mockReset();
    mockedPost.mockResolvedValue({ data: { content: { page: {} } } });
  });

  it('sends cmd/language/page only when logged out', async () => {
    await getPage({ language: 'en', page: '/terms' });

    expect(mockedPost).toHaveBeenCalledTimes(1);
    const body = mockedPost.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(body).toEqual({ cmd: 'getPage', language: 'en', page: '/terms' });
    expect(body).not.toHaveProperty('token');
  });

  it('includes token only when non-empty', async () => {
    await getPage({ language: 'en', page: '/terms', token: 'tok_1' });

    const body = mockedPost.mock.calls[0]?.[1] as Record<string, unknown>;
    expect(body).toEqual({ cmd: 'getPage', language: 'en', page: '/terms', token: 'tok_1' });
  });

  it('does not send null or empty token', async () => {
    await getPage({ language: 'en', page: '/terms', token: null });
    expect(mockedPost.mock.calls[0]?.[1]).not.toHaveProperty('token');

    mockedPost.mockClear();
    await getPage({ language: 'en', page: '/terms', token: '' });
    expect(mockedPost.mock.calls[0]?.[1]).not.toHaveProperty('token');
  });
});
