import type { HtmlTagDescriptor } from 'vite';

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  buildExternalStylesheetTags,
  extractExternalStylesheetImports,
  fontsStylesheetPlugin,
} from '../vite-plugin-fonts-stylesheet';

function getHookHandler<T extends (...args: never[]) => unknown>(
  hook: T | { handler: T } | undefined,
): T | undefined {
  if (hook == null) {
    return undefined;
  }

  return typeof hook === 'function' ? hook : hook.handler;
}

describe('extractExternalStylesheetImports', () => {
  it('extracts remote stylesheet imports and leaves the rest of the file intact', () => {
    const source = `
@import 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap';

@font-face {
  font-family: 'Custom Sans';
  src: url('../fonts/CustomSans-Regular.woff2') format('woff2');
}
`;

    const result = extractExternalStylesheetImports(source);

    expect(result.urls).toEqual([
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
    ]);
    expect(result.code).not.toContain('https://fonts.googleapis.com');
    expect(result.code).toContain('@font-face');
  });
});

describe('buildExternalStylesheetTags', () => {
  it('creates preconnect and stylesheet tags for Google Fonts imports', () => {
    const tags = buildExternalStylesheetTags([
      'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
    ]);

    expect(tags).toEqual(
      expect.arrayContaining<HtmlTagDescriptor>([
        expect.objectContaining({
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        }),
        expect.objectContaining({
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        }),
        expect.objectContaining({
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
          },
        }),
      ]),
    );
  });
});

describe('fontsStylesheetPlugin', () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('strips remote imports from fonts.scss and injects them into html', async () => {
    const root = mkdtempSync(join(tmpdir(), 'igambling-fonts-plugin-'));
    const fontsDir = join(root, 'src/assets/styles');
    const fontsFile = join(fontsDir, 'fonts.scss');
    tempDirs.push(root);

    mkdirSync(fontsDir, { recursive: true });
    writeFileSync(
      fontsFile,
      "@import 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap';\n\nbody { color: red; }\n",
      'utf8',
    );

    const plugin = fontsStylesheetPlugin();
    const configResolved = getHookHandler(plugin.configResolved);
    const transform = getHookHandler(plugin.transform);

    await configResolved?.({ root } as never);

    const transformed = await transform?.call(
      {} as never,
      "@import 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap';\n\nbody { color: red; }\n",
      fontsFile,
    );

    const transformedCode =
      typeof transformed === 'object' && transformed != null ? transformed.code : transformed;

    expect(transformedCode).not.toContain('https://fonts.googleapis.com');
    expect(transformedCode).toContain('body { color: red; }');

    const htmlResult = await (
      plugin.transformIndexHtml as (
        html: string,
      ) => Promise<{ html: string; tags: HtmlTagDescriptor[] }>
    )('<html><head></head><body></body></html>');

    expect(htmlResult.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
          },
        }),
      ]),
    );
  });
});
