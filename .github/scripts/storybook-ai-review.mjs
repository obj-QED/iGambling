#!/usr/bin/env node
/**
 * Optional AI review — skips gracefully when OPENAI_API_KEY is unset.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const REPORT_DIR = path.join(ROOT, 'reports');

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('OPENAI_API_KEY not set — skipping AI review');
    return;
  }

  const [indexRaw, settingsRaw] = await Promise.all([
    readFile(path.join(ROOT, 'storybook-static', 'index.json'), 'utf8'),
    readFile(path.join(ROOT, 'src', 'assets', 'settings', 'index.js'), 'utf8').catch(() => ''),
  ]);

  const index = JSON.parse(indexRaw);
  const storyTitles = [
    ...new Set(
      Object.values(index.entries)
        .filter((entry) => entry.type === 'story')
        .map((entry) => entry.title),
    ),
  ];

  const prompt = [
    'Review this design system Storybook catalog for a casino/gambling UI.',
    'Focus on: component coverage, naming, accessibility risks, settings-driven layout.',
    '',
    'Story groups:',
    storyTitles.join('\n'),
    '',
    'App settings snippet:',
    settingsRaw.slice(0, 4000),
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a senior design system reviewer. Be concise, actionable, and prioritize a11y and API boundaries.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content ?? 'No review generated.';

  await mkdir(REPORT_DIR, { recursive: true });
  await writeFile(path.join(REPORT_DIR, 'storybook-ai-review.txt'), content);
  console.log('AI review written to reports/storybook-ai-review.txt');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
