import type { SearchSchema } from '../config';

import { useSelector } from 'react-redux';

import { selectAppSearchSchema } from '@store/slices/contextSlice';

/** Resolved AppSearch schema from Redux `context.appSearch.schema`. */
export function useSearchConfig(): SearchSchema {
  const schema = useSelector(selectAppSearchSchema);
  return {
    type: schema.type as SearchSchema['type'],
    style: schema.style as SearchSchema['style'],
  };
}

/** Same as useSearchConfig — schema lives in Redux after AppSearch mounts. */
export function useSearchConfigOptional(): SearchSchema | null {
  return useSearchConfig();
}
