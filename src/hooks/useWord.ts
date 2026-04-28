import type { RootState } from '@/store';

import { useCallback } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

import { selectWords } from '@/store/slices/wordsSlice';

/**
 * Returns a translator function by key from store.words.
 * If key is missing, returns the key itself (safe fallback).
 *
 * @example
 * const t = useWord();
 * <h1>{t('menu_home')}</h1>   // -> "Home"
 */
export function useWord() {
  const words = useSelector(selectWords);
  return useCallback((key: string): string => words[key] ?? key, [words]);
}

/**
 * Returns translation entries filtered by a prefix.
 * Uses shallowEqual to keep a stable reference.
 *
 * @example
 * const menuWords = useWordsByPrefix('menu_');
 * // -> { menu_home: 'Home', menu_games: 'Games' }
 */
export function useWordsByPrefix(prefix: string): Record<string, string> {
  return useSelector(
    (state: RootState) => {
      const words = state.words;
      return Object.fromEntries(
        Object.entries(words).filter(([k]) => k.startsWith(prefix)),
      );
    },
    shallowEqual,
  );
}
