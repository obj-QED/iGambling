import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { parseBreakpointsScss } from '../../../build/sync-breakpoints-scss';
import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';

const SCSS_PATH = fileURLToPath(
  new URL('../../../src/assets/theme/breakpoints.scss', import.meta.url),
);

describe('breakpoints SoT sync', () => {
  it('BREAKPOINTS_PX matches breakpoints.scss (edit scss, run Vite)', () => {
    const fromScss = parseBreakpointsScss(readFileSync(SCSS_PATH, 'utf8'));
    expect(BREAKPOINTS_PX).toEqual(fromScss);
  });
});
