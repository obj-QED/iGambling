import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { BREAKPOINTS_PX } from '@/assets/theme/breakpoints';

const SCSS_PATH = fileURLToPath(
  new URL('../../../src/assets/theme/breakpoints.scss', import.meta.url),
);

describe('breakpoints SoT sync', () => {
  it('breakpoints.scss matches BREAKPOINTS_PX (edit breakpoints.ts, run Vite)', () => {
    const scss = readFileSync(SCSS_PATH, 'utf8');
    for (const [name, px] of Object.entries(BREAKPOINTS_PX)) {
      expect(scss).toMatch(new RegExp(`\\$${name}:\\s*${px}px`));
    }
  });
});
