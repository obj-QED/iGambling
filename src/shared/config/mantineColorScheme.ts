import { localStorageColorSchemeManager } from '@mantine/core';

/**
 * Persist Mantine color scheme (light | dark | auto).
 * Keep the `<script>` in `index.html` (early FOUC guard) using this same key.
 */
export const MANTINE_COLOR_SCHEME_STORAGE_KEY = 'igambling-mantine-color-scheme';

export const mantineColorSchemeManager = localStorageColorSchemeManager({
  key: MANTINE_COLOR_SCHEME_STORAGE_KEY,
});
