import { createContext } from 'react';

import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useRequiredContext } from '@/shared/hooks';

const Ctx = createContext<string | null>(null);

describe('useRequiredContext', () => {
  it('returns the provided value', () => {
    const { result } = renderHook(() => useRequiredContext(Ctx, 'missing'), {
      wrapper: ({ children }) => <Ctx.Provider value="ok">{children}</Ctx.Provider>,
    });
    expect(result.current).toBe('ok');
  });

  it('throws when the provider is missing', () => {
    expect(() => renderHook(() => useRequiredContext(Ctx, 'missing'))).toThrow('missing');
  });
});
