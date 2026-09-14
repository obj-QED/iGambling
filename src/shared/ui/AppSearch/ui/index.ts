/**
 * Shared AppSearch trigger UI — keyed by settings `style`:
 * - `icon` / `compact` → SearchIconTrigger
 * - `input` → SearchInputTrigger
 *
 * Widget adapters own paint (`styles/blocks/*`); these are behavior + chrome primitives.
 */
export { SearchIconTrigger, type SearchIconTriggerProps } from './icon';
export {
  SearchInputStyle,
  type SearchInputStyleProps,
  SearchInputTrigger,
  type SearchInputTriggerProps,
} from './input';
