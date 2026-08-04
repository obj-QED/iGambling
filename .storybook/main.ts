import type { StorybookConfig } from '@storybook/react-vite';

import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

import { scssAdditionalData } from '../build/scss-config.ts';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@chromatic-com/storybook'],
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    // GitHub Pages needs `/iGambling/`; local Storybook must stay at `/` or iframe assets 404.
    const pagesBase = process.env.STORYBOOK_BASE ?? (process.env.CI ? '/iGambling/' : '/');
    viteConfig.base = pagesBase;

    return mergeConfig(viteConfig, {
      define: {
        'import.meta.env.STORYBOOK': JSON.stringify('true'),
      },
      resolve: {
        alias: {
          '@': srcDir,
          '@ui': fileURLToPath(new URL('../src/shared/ui', import.meta.url)),
          '@shared': fileURLToPath(new URL('../src/shared', import.meta.url)),
          '@api': fileURLToPath(new URL('../src/api', import.meta.url)),
          '@store': fileURLToPath(new URL('../src/store', import.meta.url)),
          '@hooks': fileURLToPath(new URL('../src/hooks', import.meta.url)),
          '@pages': fileURLToPath(new URL('../src/pages', import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [srcDir],
            additionalData: scssAdditionalData,
          },
        },
      },
    });
  },
};

export default config;
