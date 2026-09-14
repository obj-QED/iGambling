/** True when main outlet should show input-type results instead of the page. */
export function shouldShowSearchResults(state: {
  query: string;
  pageMode: 'idle' | 'input';
  globalType: string;
}): boolean {
  if (state.pageMode === 'input') {
    return state.query.trim().length > 0;
  }
  return state.globalType === 'input' && state.query.trim().length > 0;
}
