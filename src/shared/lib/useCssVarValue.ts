import { useLayoutEffect, useState } from 'react';

/**
 * Reads a custom property from `:root` after mount (fallback before hydration / if empty).
 */
export function useCssVarValue(propertyName: string, fallback: string): string {
  const [value, setValue] = useState(fallback);

  useLayoutEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
    setValue(raw.length > 0 ? raw : fallback);
  }, [propertyName, fallback]);

  return value;
}
