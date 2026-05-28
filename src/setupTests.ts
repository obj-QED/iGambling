import { vi } from 'vitest';

import '@testing-library/jest-dom/vitest';

const { tokensScssRawFixture } = vi.hoisted(() => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { readFileSync } = require('node:fs') as typeof import('node:fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { join } = require('node:path') as typeof import('node:path');
  const tokensPath = join(process.cwd(), 'src/assets/styles/_tokens.scss');
  return { tokensScssRawFixture: readFileSync(tokensPath, 'utf-8') };
});

vi.mock('@/assets/styles/_tokens.scss?raw', () => ({
  default: tokensScssRawFixture,
}));
