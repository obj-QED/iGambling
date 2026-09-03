import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

import { scssAdditionalData } from './build/scss-config.ts';
import { themeBuildPlugin } from './vite-plugin-assets-build.ts';
import { cssCascadeFullReloadPlugin } from './vite-plugin-css-cascade-full-reload.ts';
import { fontsStylesheetPlugin } from './vite-plugin-fonts-stylesheet.ts';

/** Non-empty trim; CI / missing keys stay safe. */
function envUrl(env: Record<string, string>, key: string): string {
  const raw = env[key];
  return typeof raw === 'string' ? raw.trim() : '';
}

/**
 * Proxy target for /apiLobby.php + /api.php.
 * Prod often sets `VITE_APP_URL=` (same-origin) which overrides `.env.local` under
 * `vite preview` → without a fallback the proxy hits `http://localhost` (ECONNREFUSED).
 * Client bundle still uses mode env; only the Node proxy needs a reachable origin locally.
 */
function resolveApiProxyTarget(modeEnv: Record<string, string>, cwd: string): string {
  const fromMode = envUrl(modeEnv, 'VITE_APP_URL') || envUrl(modeEnv, 'VITE_LOBBY_API_URL');
  if (fromMode) return fromMode;

  const devEnv = loadEnv('development', cwd, '');
  return (
    envUrl(devEnv, 'VITE_APP_URL') || envUrl(devEnv, 'VITE_LOBBY_API_URL') || 'http://localhost'
  );
}

export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd, '');
  const apiTarget = resolveApiProxyTarget(env, cwd);
  const apiProxy = {
    '/apiLobby.php': {
      target: apiTarget,
      changeOrigin: true,
    },
    '/api.php': {
      target: apiTarget,
      changeOrigin: true,
    },
  } as const;
  const isProd = mode === 'production';
  const shouldAnalyze = env.VITE_ANALYZE === 'true';
  const profilerEnabled = env.PROFILER_ENABLED === 'true';
  return {
    plugins: [
      react(),
      fontsStylesheetPlugin(),
      themeBuildPlugin(),
      cssCascadeFullReloadPlugin(),
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
      proxy: { ...apiProxy },
    },
    preview: {
      proxy: { ...apiProxy },
    },
    define: {
      'import.meta.env.PROFILER_ENABLED': JSON.stringify(profilerEnabled),
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
