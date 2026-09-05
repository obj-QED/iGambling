import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const scss = readFileSync(
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../../../src/app/layouts/AppLayout/AppLayout.module.scss',
  ),
  'utf8',
);

describe('shell skeleton overlay CSS', () => {
  it('paints opaque skeleton on the chrome control itself, not Button/active pseudos', () => {
    const chromeHost = scss.match(
      /\.root\[data-shell-skeleton\]\s+:where\(\[data-widget='header'\][\s\S]*?:where\(a, button, \[role='button'\]\) \{([\s\S]*?)\n\}/,
    )?.[1];

    expect(chromeHost).toMatch(/background-color:\s*var\(--shell-skel-from\)/);
    expect(scss).not.toMatch(
      /:where\(a, button, \[role='button'\]\)(?:\[data-active\])?::(?:before|after) \{[^}]*animation:\s*shell-skel-pulse/,
    );
  });

  it('does not pulse overlay opacity (see-through live chrome)', () => {
    expect(scss).not.toMatch(/@keyframes\s+shell-skel-\w+[\s\S]{0,200}opacity:\s*0\.4/);
  });
});
