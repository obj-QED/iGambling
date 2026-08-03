import { describe, expect, it } from 'vitest';

import { hasTooltipLabel, resolveAppTooltipLabel } from '@/shared/lib/tooltip';

describe('resolveAppTooltipLabel', () => {
  it('prefers label over name', () => {
    expect(resolveAppTooltipLabel('Home', 'Ignored')).toBe('Home');
    expect(resolveAppTooltipLabel('  Home  ', 'Name')).toBe('Home');
  });

  it('falls back to name when label is empty', () => {
    expect(resolveAppTooltipLabel(undefined, 'Jackpots')).toBe('Jackpots');
    expect(resolveAppTooltipLabel('', 'Jackpots')).toBe('Jackpots');
    expect(resolveAppTooltipLabel('   ', 'Jackpots')).toBe('Jackpots');
  });

  it('returns undefined when both are empty', () => {
    expect(resolveAppTooltipLabel(undefined, undefined)).toBeUndefined();
    expect(resolveAppTooltipLabel('', '  ')).toBeUndefined();
  });
});

describe('hasTooltipLabel', () => {
  it('rejects empty strings', () => {
    expect(hasTooltipLabel('')).toBe(false);
    expect(hasTooltipLabel('  ')).toBe(false);
    expect(hasTooltipLabel('Ok')).toBe(true);
  });
});
