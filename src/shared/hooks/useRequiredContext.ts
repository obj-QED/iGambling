import type { Context } from 'react';

import { useContext } from 'react';

/** Read a React context that must be provided — one throw site for widget hooks. */
export function useRequiredContext<T>(context: Context<T | null>, message: string): T {
  const value = useContext(context);
  if (value === null) {
    throw new Error(message);
  }
  return value;
}
