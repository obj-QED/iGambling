import { describe, expect, it } from 'vitest';

import { isAppProfilerEnabled } from '@/app/performance/isAppProfilerEnabled';

describe('isAppProfilerEnabled', () => {
  it('is on only in dev when PROFILER_ENABLED is true', () => {
    expect(isAppProfilerEnabled(true, true)).toBe(true);
    expect(isAppProfilerEnabled(true, false)).toBe(false);
    expect(isAppProfilerEnabled(false, true)).toBe(false);
    expect(isAppProfilerEnabled(undefined, true)).toBe(false);
  });
});
