import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { '@': path.resolve(root, 'src') } },
  test: {
    environment: 'node',
    setupFiles: [],
    include: [
      'test/shared/lib/cmf/cmfControlAttrs.test.ts',
      'test/shared/lib/cmf/resolveCmfScope.test.ts',
      'test/widgets/sidebar/lib/itemUtils.test.ts',
      'test/widgets/header/lib/itemUtils.test.ts',
    ],
  },
});
