import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

import { themeBuildPlugin } from './vite-plugin-assets-build';

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
  const apiTarget = env.VITE_APP_URL || env.VITE_LOBBY_API_URL || 'https://999ggg.net';
  const isProd = mode === 'production';
  const shouldAnalyze = env.VITE_ANALYZE === 'true';
  return {
    plugins: [
      react(),
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
        ...getComponentAliases(fileURLToPath(new URL('./src/components', import.meta.url))),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: id => {
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
        localsConvention: 'camelCase',
        generateScopedName: isProd ? '[hash:base64:5]' : '[name]_[local]_[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
          additionalData: `@use "assets/styles/tokens" as *; @use "assets/styles/mixins" as *;`,
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
