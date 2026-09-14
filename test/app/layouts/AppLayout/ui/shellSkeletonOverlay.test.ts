import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const scss = readFileSync(
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../../../../src/app/layouts/AppLayout/ui/AppLayout.module.scss',
  ),
  'utf8',
);

describe('shell skeleton overlay CSS', () => {
  it('paints opaque skeleton on chrome controls including search TextInput hosts', () => {
    expect(scss).toMatch(/\[data-cmf-key='search'\]/);
    expect(scss).toMatch(/\[data-cmf-key='search_leftmenu'\]/);
    /* TextInput puts data-cmf on <input>; :has paints the wrapper that owns sections. */
    expect(scss).toMatch(/:has\([\s\S]*?data-cmf-key='search'/);
    expect(scss).toMatch(
      /\.root\[data-shell-skeleton\][\s\S]*?background:\s*var\(--shell-skel-from\)/,
    );
    expect(scss).not.toMatch(
      /:where\(a, button, \[role='button'\]\)(?:\[data-active\])?::(?:before|after) \{[^}]*animation:\s*shell-skel-pulse/,
    );
  });

  it('does not pulse overlay opacity (see-through live chrome)', () => {
    expect(scss).not.toMatch(/@keyframes\s+shell-skel-\w+[\s\S]{0,200}opacity:\s*0\.4/);
  });

  it('mirrors search field radius on TextInput skeleton hosts', () => {
    expect(scss).toMatch(/\[data-cmf-key='search'\][\s\S]*?border-radius:\s*var\(--input-radius/);
  });
});
