#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const INDEX_PATH = path.join(ROOT, 'storybook-static', 'index.json');
const REPORT_DIR = path.join(ROOT, 'reports');

async function main() {
  const raw = await readFile(INDEX_PATH, 'utf8');
  const index = JSON.parse(raw);

  const stories = Object.values(index.entries).filter((entry) => entry.type === 'story');
  const docs = Object.values(index.entries).filter((entry) => entry.type === 'docs');

  const byTitle = stories.reduce((acc, story) => {
    acc[story.title] = (acc[story.title] ?? 0) + 1;
    return acc;
  }, {});

  const report = {
    generatedAt: new Date().toISOString(),
    storyCount: stories.length,
    docsCount: docs.length,
    components: Object.keys(byTitle).sort(),
    storiesByComponent: byTitle,
  };

  await mkdir(REPORT_DIR, { recursive: true });
  await writeFile(path.join(REPORT_DIR, 'story-index.json'), JSON.stringify(report, null, 2));
  console.log(`Storybook index: ${report.storyCount} stories, ${report.docsCount} docs pages`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
