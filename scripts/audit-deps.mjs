#!/usr/bin/env node
/**
 * Fail CI on high/critical advisories for direct production dependencies only.
 * Transitive / dev-tool advisories are printed as warnings (not CI-blocking).
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const productionDirect = new Set(Object.keys(pkg.dependencies ?? {}));

const result = spawnSync('yarn', ['npm', 'audit', '--json', '--recursive', '--severity', 'high'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
  cwd: root,
});

const lines = `${result.stdout}\n${result.stderr}`
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

/** @type {Array<{ name: string; severity: string; url: string }>} */
const findings = [];

for (const line of lines) {
  if (!line.startsWith('{')) continue;
  try {
    const row = JSON.parse(line);
    const name = typeof row.value === 'string' ? row.value : '';
    const children = row.children ?? {};
    const severity = String(children.Severity ?? '').toLowerCase();
    if (severity !== 'high' && severity !== 'critical') continue;
    findings.push({
      name,
      severity,
      url: String(children.URL ?? ''),
    });
  } catch {
    /* skip */
  }
}

const blocking = findings.filter((f) => productionDirect.has(f.name));
const warned = findings.filter((f) => !productionDirect.has(f.name));

const uniqueWarn = [...new Map(warned.map((f) => [`${f.name}:${f.url}`, f])).values()];
for (const f of uniqueWarn.slice(0, 20)) {
  console.warn(`[audit:deps] (transitive/dev) ${f.severity} ${f.name}`);
}
if (uniqueWarn.length > 20) {
  console.warn(`[audit:deps] … +${uniqueWarn.length - 20} more non-direct advisories`);
}

const uniqueBlock = [...new Map(blocking.map((f) => [`${f.name}:${f.url}`, f])).values()];

if (uniqueBlock.length === 0) {
  console.log(
    `[audit:deps] OK — no high/critical on direct production deps (${productionDirect.size} checked)`,
  );
  process.exit(0);
}

console.error('[audit:deps] FAIL — direct production advisories:');
for (const f of uniqueBlock) {
  console.error(`  - [${f.severity}] ${f.name} ${f.url}`);
}
process.exit(1);
