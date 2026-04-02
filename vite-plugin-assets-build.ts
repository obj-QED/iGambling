import type { Plugin } from 'vite';

import { mkdir,readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { compileString } from 'sass';

async function collectFiles(dir: string, ext: string[]): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await collectFiles(full, ext)));
    } else if (ext.some((ex) => e.name.endsWith(ex))) {
      files.push(full);
    }
  }
  return files;
}

function themeBuildPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'vite-plugin-theme-settings-build',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const root = join(process.cwd(), 'src', 'assets');
      const themeDir = join(root, 'theme');
      const settingsDir = join(root, 'settings');

      try {
        // theme → dist/theme.css
        const themeFiles = await collectFiles(themeDir, ['.css', '.scss']);
        if (themeFiles.length > 0) {
          let css = '';
          for (const file of themeFiles) {
            const raw = await readFile(file, 'utf-8');
            if (file.endsWith('.scss')) {
              const { css: compiled } = compileString(raw, {
                loadPaths: [join(process.cwd(), 'src')],
                style: 'expanded',
              });
              css += compiled;
            } else {
              css += raw;
            }
            css += '\n';
          }
          await mkdir(outDir, { recursive: true });
          await writeFile(join(outDir, 'theme.css'), css.trim(), 'utf-8');
        }

        // settings → dist/settings.js
        const settingsFiles = await collectFiles(settingsDir, ['.js']);
        if (settingsFiles.length > 0) {
          let js = '';
          for (const file of settingsFiles) {
            js += await readFile(file, 'utf-8');
            js += '\n';
          }
          await mkdir(outDir, { recursive: true });
          await writeFile(join(outDir, 'settings.js'), js.trim(), 'utf-8');
        }
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
      }
    },
  };
}

export { themeBuildPlugin };
