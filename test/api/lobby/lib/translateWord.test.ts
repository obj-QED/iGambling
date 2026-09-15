import { describe, expect, it } from 'vitest';

import { missingTranslationLabel, translateWord } from '@/api/lobby/lib/translateWord';

describe('translateWord', () => {
  it('returns dictionary value when key exists', () => {
    expect(translateWord({ 'menu.home': 'Home' }, 'menu.home')).toBe('Home');
  });

  it('formats missing key as ->lang{key} without spaces', () => {
    expect(missingTranslationLabel('menu.home')).toBe('->langmenu.home');
    expect(translateWord(undefined, 'ok')).toBe('->langok');
    expect(translateWord({}, 'missing')).toBe('->langmissing');
  });
});
