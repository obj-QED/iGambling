import { useLayoutEffect, useState } from 'react';

/**
 * Значение кастомного свойства на `:root` после монтирования (fallback до гидрации / если пусто).
 */
export function useCssVarValue(propertyName: string, fallback: string): string {
  const [value, setValue] = useState(fallback);

  useLayoutEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
    setValue(raw.length > 0 ? raw : fallback);
  }, [propertyName, fallback]);

  return value;
}
