import { describe, expect, it } from 'vitest';

import { DEFAULT_TOOLTIP_CONFIG } from '@/shared/config';
import { resolveTooltipConfig } from '@/shared/lib/tooltip';

describe('resolveTooltipConfig', () => {
  it('returns defaults with no layers', () => {
    expect(resolveTooltipConfig()).toEqual(DEFAULT_TOOLTIP_CONFIG);
  });

  it('merges layers left-to-right (later wins)', () => {
    expect(
      resolveTooltipConfig(
        { enabled: true, position: 'right', delay: 200 },
        { delay: 400, position: 'left' },
        { enabled: false },
      ),
    ).toEqual({
      enabled: false,
      position: 'left',
      delay: 400,
      closeDelay: 300,
      withArrow: true,
      offset: 5,
    });
  });

  it('merges closeDelay from settings', () => {
    expect(resolveTooltipConfig({ closeDelay: 500 }).closeDelay).toBe(500);
  });

  it('passthroughs typed Mantine tooltip props', () => {
    expect(resolveTooltipConfig({ enabled: true, multiline: true }).multiline).toBe(true);
  });

  it('ignores invalid position and keeps previous', () => {
    expect(
      resolveTooltipConfig({ position: 'right' }, { position: 'not-a-position' as 'top' }).position,
    ).toBe('right');
  });
});
