import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

import { scssAdditionalData } from './build/scss-config';
import { themeBuildPlugin } from './vite-plugin-assets-build';
import { fontsStylesheetPlugin } from './vite-plugin-fonts-stylesheet';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const viteAppUrl = env.VITE_APP_URL ?? '';
  const apiTarget =
    viteAppUrl.length > 0 ? viteAppUrl : (env.VITE_LOBBY_API_URL ?? 'http://localhost');
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
        '@ui': fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      cssTarget: ['chrome90', 'edge90', 'firefox90', 'safari13', 'ios13', 'opera76'],
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
      modules: {
        generateScopedName: isProd ? '[hash:base64:8]' : '[name]_[local]_[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
          additionalData: scssAdditionalData,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
      include: ['test/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
    },
  };
});
