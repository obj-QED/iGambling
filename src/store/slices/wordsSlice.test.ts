import type { RootState } from '@store';

import { describe, expect, it } from 'vitest';

import { selectWord, selectWords, setWords, wordsReducer } from './wordsSlice';

describe('wordsSlice', () => {
  it('stores flat words dictionary', () => {
    const nextState = wordsReducer({}, setWords({ hello: 'Привет', world: 'Мир' }));
    expect(nextState).toEqual({ hello: 'Привет', world: 'Мир' });
  });

  it('selectWord falls back to key when missing', () => {
    const state = {
      auth: { isAuthenticated: false },
      words: {
        login: 'Войти',
      },
    } as RootState;

    expect(selectWords(state)).toEqual({ login: 'Войти' });
    expect(selectWord('login')(state)).toBe('Войти');
    expect(selectWord('unknown_key')(state)).toBe('unknown_key');
  });
});
