import type { RootState } from '@/store';

import { useCallback } from 'react';

import { shallowEqual, useSelector } from 'react-redux';

import { selectWords } from '@/store/slices/wordsSlice';

/**
 * Возвращает функцию-переводчик по ключу из store.words.
 * Если ключ не найден — возвращает сам ключ (безопасный fallback).
 *
 * @example
 * const t = useWord();
 * <h1>{t('menu_home')}</h1>   // → "Главная"
 */
export function useWord() {
  const words = useSelector(selectWords);
  return useCallback((key: string): string => words[key] ?? key, [words]);
}

/**
 * Возвращает объект переводов с указанным префиксом.
 * Использует shallowEqual для стабильности ссылки.
 *
 * @example
 * const menuWords = useWordsByPrefix('menu_');
 * // → { menu_home: 'Главная', menu_games: 'Игры' }
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
