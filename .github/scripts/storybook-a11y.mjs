#!/usr/bin/env node
/**
 * Accessibility gate for built Storybook (axe + Playwright).
 */
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const STATIC_DIR = path.join(ROOT, 'storybook-static');
const REPORT_DIR = path.join(ROOT, 'reports');
const BASE_PATH = '/iGambling';
const PORT = 4173;
const HOST = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.png': 'image/png',
};

const IFRAME_ONLY_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];
const FAIL_IMPACTS = new Set(['critical', 'serious']);

const STORY_IDS = [
  'elements-button--playground',
  'elements-actionicon--playground',
  'settings-app--header-preview',
  'widgets-header-appheader--default',
  'widgets-header-menu-controls--control-row',
];

function storyUrl(storyId) {
  const params = new URLSearchParams({ id: storyId, viewMode: 'story' });
  return `${HOST}${BASE_PATH}/iframe.html?${params.toString()}`;
}

function resolveStaticPath(requestPath) {
  let pathname = requestPath.split('?')[0] ?? '/';

  if (pathname.startsWith(BASE_PATH)) {
    pathname = pathname.slice(BASE_PATH.length) || '/';
  }

  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(STATIC_DIR, pathname);
  if (!filePath.startsWith(STATIC_DIR)) return null;
  return filePath;
}

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const filePath = resolveStaticPath(req.url ?? '/');
        if (filePath === null) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }

        const content = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => resolve(server));
  });
}

async function loadStoryCatalog() {
  const raw = await readFile(path.join(STATIC_DIR, 'index.json'), 'utf8');
  const index = JSON.parse(raw);
  const available = new Set(
    Object.values(index.entries)
      .filter((entry) => entry.type === 'story')
      .map((entry) => entry.id),
  );

  return STORY_IDS.filter((id) => available.has(id));
}

async function main() {
  await mkdir(REPORT_DIR, { recursive: true });

  const stories = await loadStoryCatalog();
  if (stories.length === 0) {
    throw new Error('No Storybook stories found in storybook-static/index.json');
  }

  const server = await startServer();
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const results = [];

  try {
    for (const storyId of stories) {
      const url = storyUrl(storyId);
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('#storybook-root', { timeout: 15_000 });

      const axe = await new AxeBuilder({ page }).disableRules(IFRAME_ONLY_RULES).analyze();
      const violations = (axe.violations ?? []).filter((v) => FAIL_IMPACTS.has(v.impact ?? ''));

      results.push({
        storyId,
        url,
        violationCount: violations.length,
        violations: violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        })),
      });
    }
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const report = {
    checkedAt: new Date().toISOString(),
    stories: results,
    totalViolations: results.reduce((sum, item) => sum + item.violationCount, 0),
  };

  await writeFile(path.join(REPORT_DIR, 'a11y.json'), JSON.stringify(report, null, 2));

  if (report.totalViolations > 0) {
    console.error(`a11y: ${report.totalViolations} serious/critical violation(s)`);
    for (const item of results) {
      if (item.violationCount > 0) {
        console.error(`- ${item.storyId}: ${item.violationCount}`);
      }
    }

    if (process.env.STORYBOOK_A11Y_STRICT === 'false') {
      console.warn('STORYBOOK_A11Y_STRICT=false — report only, not failing CI');
      return;
    }

    process.exit(1);
  }

  console.log(`a11y passed (${stories.length} stories)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
