import type { Plugin } from 'vite';

import path from 'node:path';

/**
 * Partial HMR of theme / layer-order / CMF cascade can unload CSS custom properties
 * for a frame while CSS modules stay mounted — outline/button paint flashes wrong.
 * Force a full reload for those shared stylesheets.
 */
export function cssCascadeFullReloadPlugin(): Plugin {
  const roots = [
    `${path.sep}assets${path.sep}styles${path.sep}`,
    `${path.sep}assets${path.sep}theme${path.sep}`,
    `${path.sep}mantine${path.sep}styles${path.sep}`,
  ];

  return {
    name: 'css-cascade-full-reload',
    handleHotUpdate({ file, server }) {
      const normalized = file.replace(/\//g, path.sep);
      const isSharedCss =
        (normalized.endsWith('.scss') || normalized.endsWith('.css')) &&
        roots.some((root) => normalized.includes(root));

      if (!isSharedCss) return;

      server.ws.send({ type: 'full-reload', path: '*' });
      return [];
    },
  };
}
