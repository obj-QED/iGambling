import type { HtmlTagDescriptor, Plugin } from 'vite';

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const DEFAULT_FONTS_FILE = 'src/assets/styles/fonts.scss';
const EXTERNAL_STYLESHEET_IMPORT_RE =
  /@import\s+(?:url\()?(?<quote>['"])(?<url>https?:\/\/[^'")]+)\k<quote>\)?\s*;/g;

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

type ExtractExternalStylesheetImportsResult = {
  code: string;
  urls: string[];
};

function stripQueryAndHash(id: string): string {
  return id.replace(/[?#].*$/, '');
}

export function extractExternalStylesheetImports(
  source: string,
): ExtractExternalStylesheetImportsResult {
  const urls = new Set<string>();

  const code = source.replace(EXTERNAL_STYLESHEET_IMPORT_RE, (...args) => {
    const groups = args.at(-1) as { url?: string } | undefined;
    if (groups != null && groups.url != null) {
      urls.add(groups.url);
    }
    return '';
  });

  return {
    code,
    urls: [...urls],
  };
}

export function buildExternalStylesheetTags(urls: string[]): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = [];
  const seenPreconnects = new Set<string>();

  for (const url of urls) {
    const stylesheetOrigin = new URL(url).origin;

    if (!seenPreconnects.has(stylesheetOrigin)) {
      tags.push({
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: stylesheetOrigin,
        },
        injectTo: 'head-prepend',
      });
      seenPreconnects.add(stylesheetOrigin);
    }

    if (
      stylesheetOrigin === 'https://fonts.googleapis.com' &&
      !seenPreconnects.has('https://fonts.gstatic.com')
    ) {
      tags.push({
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        injectTo: 'head-prepend',
      });
      seenPreconnects.add('https://fonts.gstatic.com');
    }

    tags.push({
      tag: 'link',
      attrs: {
        rel: 'stylesheet',
        href: url,
      },
      injectTo: 'head-prepend',
    });
  }

  return tags;
}

export function fontsStylesheetPlugin(targetFile = DEFAULT_FONTS_FILE): Plugin {
  let resolvedFontsFile = '';

  return {
    name: 'vite-plugin-fonts-stylesheet',
    enforce: 'pre',
    configResolved(config) {
      resolvedFontsFile = normalizePath(resolve(config.root, targetFile));
    },
    transform(code, id) {
      if (normalizePath(stripQueryAndHash(id)) !== resolvedFontsFile) {
        return null;
      }

      const result = extractExternalStylesheetImports(code);
      if (result.urls.length === 0) {
        return null;
      }

      return {
        code: result.code,
        map: null,
      };
    },
    async transformIndexHtml(html) {
      try {
        const source = await readFile(resolvedFontsFile, 'utf8');
        const { urls } = extractExternalStylesheetImports(source);

        if (urls.length === 0) {
          return html;
        }

        return {
          html,
          tags: buildExternalStylesheetTags(urls),
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return html;
        }
        throw error;
      }
    },
  };
}
