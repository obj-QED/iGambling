import { describe, expect, it, vi } from 'vitest';

import { bindAppNavigate, navigateAppHref } from '@/shared/lib/routing/appNavigate';

describe('navigateAppHref', () => {
  it('uses bound navigate for internal SPA transitions', () => {
    const navigate = vi.fn();
    bindAppNavigate(navigate);
    navigateAppHref('/games');
    expect(navigate).toHaveBeenCalledWith('/games');
  });
});
