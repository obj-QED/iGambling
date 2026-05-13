import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

import { themeBuildPlugin } from './vite-plugin-assets-build';
import { fontsStylesheetPlugin } from './vite-plugin-fonts-stylesheet';

function encodeLightningCssVersion(major: number, minor = 0, patch = 0): number {
  return (major << 16) | (minor << 8) | patch;
}

function getComponentAliases(componentsDir: string): Record<string, string> {
  const aliases: Record<string, string> = {};
  for (const name of readdirSync(componentsDir)) {
    const full = resolve(componentsDir, name);
    if (statSync(full).isDirectory()) {
      aliases[`@${name}`] = full;
    }
  }
  return aliases;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_APP_URL || env.VITE_LOBBY_API_URL;
  const isProd = mode === 'production';
  const shouldAnalyze = env.VITE_ANALYZE === 'true';
  return {
    plugins: [
      react(),
      fontsStylesheetPlugin(),
      themeBuildPlugin(),
      shouldAnalyze
        ? visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
          })
        : null,
    ].filter(Boolean),
    server: {
      proxy: {
        '/apiLobby.php': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/api.php': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@elements': fileURLToPath(new URL('./src/elements', import.meta.url)),
        '@schemas': fileURLToPath(new URL('./src/schemas', import.meta.url)),
        ...getComponentAliases(fileURLToPath(new URL('./src/components', import.meta.url))),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react-dom') || id.includes('/react/')) return 'react';
              if (id.includes('react-router')) return 'router';
              if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'redux';
              if (id.includes('@tanstack/react-query')) return 'query';
              if (id.includes('axios')) return 'axios';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: {
          android: encodeLightningCssVersion(90),
          chrome: encodeLightningCssVersion(90),
          edge: encodeLightningCssVersion(90),
          firefox: encodeLightningCssVersion(90),
          ios_saf: encodeLightningCssVersion(13),
          opera: encodeLightningCssVersion(76),
          safari: encodeLightningCssVersion(13),
          samsung: encodeLightningCssVersion(14),
        },
        cssModules: {
          pattern: isProd ? '[hash]_[local]' : '[name]_[local]_[hash]',
        },
      },
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
          additionalData: `@use "assets/styles/tokens" as *; @use "assets/styles/mixins" as *; @use "shared/styles/fdd-cascade-layers" as *;`,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
    },
  };
});
